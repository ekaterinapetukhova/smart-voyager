import { Injectable } from "@nestjs/common";
import { Agent, run, RunContext, tool, webSearchTool } from "@openai/agents";
import z from "zod";
import { RouteMode, RouteType } from "@prisma/client";
import { CreateRouteService } from "../route/service/create-route.service";
import { CreateRouteDto } from "../route/dto/create-route.dto";
import { GetUserByIdService } from "../user/service/get-user-by-id.service";
import { GeoapifyAutocompleteService } from "../geoapify/service/geoapify-autocomplete.service";
import { ValidAiContentMessage } from "./dto/suggest-trip-content.dto";

interface AIExecutionContext {
  userId: string;
}

const validFormattedResponseSchema = z.object({
  name: z.string(),
  description: z.string(),
  placesToVisit: z.array(
    z.object({
      name: z.string(),
      city: z.string(),
      country: z.string(),
    })
  ),
});

type ValidFormattedResponse = z.output<typeof validFormattedResponseSchema>;

interface ToolResult {
  type: string;
  name: string;
  callId: string;
  status: string;
  output: { type: string; text: string };
}

@Injectable()
export class OpenAIService {
  private readonly agent: Agent<AIExecutionContext>;

  public constructor(
    private readonly geoapifyAutocompleteService: GeoapifyAutocompleteService,
    private readonly createRouteService: CreateRouteService,
    private readonly getUserByIdService: GetUserByIdService
  ) {
    const planTripTool = tool<typeof validFormattedResponseSchema, AIExecutionContext, string>({
      name: "plan_trip",
      description: "plan a trip with places",
      parameters: validFormattedResponseSchema,
      execute: async (trip, context: RunContext<AIExecutionContext> | undefined) => {
        const createRouteDto = await this.formatResponse(trip);

        if (!context) {
          return "failed to create a trip, stop now";
        }

        const user = await this.getUserByIdService.execute(context.context.userId);

        const route = await this.createRouteService.execute(createRouteDto, user);

        return route.id;
      },
    });

    const verifyPlaceTool = tool<
      typeof validFormattedResponseSchema.shape.placesToVisit.element,
      AIExecutionContext,
      string
    >({
      name: "verify_place",
      description: "verify if place exists",
      parameters: validFormattedResponseSchema.shape.placesToVisit.element,
      execute: async (place) => {
        console.log("verifying place", place);

        try {
          await this.geoapifyAutocompleteService.execute(`${place.name}, ${place.city}, ${place.country}`);

          console.log("place exists");

          return "place exists";
        } catch {
          console.log("place does not exist");

          return "place does not exist";
        }
      },
    });

    this.agent = new Agent<AIExecutionContext>({
      name: "trip planner",
      model: "gpt-5",
      instructions:
        "you are agent that provides exciting and interesting trips for user mainly focused on the places and reproduce answer in json format with name of the trip, short description and places one-by-one. Verify all provided places exist before including them into final list",
      tools: [planTripTool, webSearchTool(), verifyPlaceTool],
    });
  }

  public async execute(data: ValidAiContentMessage, userId: string): Promise<string | undefined> {
    const result = await run(this.agent, data.content, {
      context: {
        userId,
      } satisfies AIExecutionContext,
      maxTurns: 15,
    });

    console.log(result.finalOutput);

    const toolResult = result.output.find(
      (x) => x.type === "function_call_result" && x.name === "plan_trip"
    ) as ToolResult;

    return toolResult.output.text;
  }

  private async formatResponse(response: ValidFormattedResponse): Promise<CreateRouteDto> {
    const waypoints = await Promise.all(
      response.placesToVisit.map(async (place) => {
        try {
          const { lat, lng, fullAddress } = await this.geoapifyAutocompleteService.execute(
            `${place.name}, ${place.city}, ${place.country}`
          );

          return {
            latitude: lat,
            longitude: lng,
            name: place.name,
            fullAddress: fullAddress,
          };
        } catch (e) {
          console.log(e);
          return null;
        }
      })
    );

    const result: CreateRouteDto = {
      waypoints: waypoints.filter((x) => !!x),
      type: RouteType.balanced,
      name: `AI generated - ${response.name}`,
      mode: RouteMode.transit,
      isProposal: true,
      description: response.description,
    };

    return result;
  }
}
