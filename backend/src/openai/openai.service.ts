import { Injectable } from "@nestjs/common";
import { Agent, run, RunContext, tool, webSearchTool } from "@openai/agents";
import z from "zod";
import { RouteMode, RouteType } from "@prisma/client";
import { GeoapifyForwardGeocodeService } from "../geoapify/service/geoapify-forward-geocode.service";
import { CreateRouteService } from "../route/service/create-route.service";
import { CreateRouteDto } from "../route/dto/create-route.dto";
import { GetUserByIdService } from "../user/service/get-user-by-id.service";
import { ValidAiContentMessage } from "./dto/suggest-trip-content.dto";

interface AIExecutionContext {
  userId: string;
}

const validFormattedResponseSchema = z.object({
  name: z.string(),
  placesToVisit: z.array(
    z.object({
      name: z.string(),
      fullAddress: z.string(),
    })
  ),
});

type ValidFormattedResponse = z.output<typeof validFormattedResponseSchema>;

@Injectable()
export class OpenAIService {
  private readonly agent: Agent<AIExecutionContext>;

  public constructor(
    private readonly geoapifyForwardGeocodeService: GeoapifyForwardGeocodeService,
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

        await this.createRouteService.execute(createRouteDto, user);

        return "trip was created successfully";
      },
    });

    this.agent = new Agent<AIExecutionContext>({
      name: "trip planner",
      instructions:
        "you are agent that provides exciting and interesting trips for user mainly focused on the places and reproduce answer in json format with name of the city and placers one-by-one with their names and full addresses",
      tools: [planTripTool, webSearchTool()],
    });
  }

  public async execute(data: ValidAiContentMessage, userId: string): Promise<string | undefined> {
    const result = await run(this.agent, data.content, {
      context: {
        userId,
      } satisfies AIExecutionContext,
      maxTurns: 5,
    });

    return result.finalOutput;
  }

  private async formatResponse(response: ValidFormattedResponse): Promise<CreateRouteDto> {
    const waypoints = await Promise.all(
      response.placesToVisit.map(async (place) => {
        const { lat, lng } = await this.geoapifyForwardGeocodeService.execute(place.fullAddress);

        return {
          latitude: lat,
          longitude: lng,
          name: place.name,
          fullAddress: place.fullAddress,
        };
      })
    );

    const result: CreateRouteDto = {
      waypoints,
      type: RouteType.balanced,
      name: `AI generated - ${response.name}`,
      mode: RouteMode.drive,
      isProposal: true,
    };

    return result;
  }
}
