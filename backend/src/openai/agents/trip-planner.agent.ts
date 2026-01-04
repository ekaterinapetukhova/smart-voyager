import { Injectable } from "@nestjs/common";
import { Agent, run, webSearchTool } from "@openai/agents";
import { z } from "zod";
import { z as zv4 } from "zod/v4";
import { VerifyPlaceTool } from "../tools/verify-place.tool";
import { AIExecutionContext } from "../openai.types";
import { CreateTripDto } from "../../trip/dto/create-trip.dto";
import { GeoapifyAutocompleteService } from "../../geoapify/service/geoapify-autocomplete.service";
import { ServerError } from "../../error/server.error";

export const tripPlannerInputSchema = zv4.object({
  content: zv4.string().min(1, "Your trip description must have at least one symbol"),
});

export type TripPlannerInput = zv4.output<typeof tripPlannerInputSchema>;

const tripPlannerOutputSchema = z.object({
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

export type TripPlannerOutput = z.output<typeof tripPlannerOutputSchema>;

@Injectable()
export class TripPlannerAgent {
  private readonly agent: Agent<AIExecutionContext, typeof tripPlannerOutputSchema>;

  public constructor(
    private readonly geoapifyAutocompleteService: GeoapifyAutocompleteService,
    verifyPlaceTool: VerifyPlaceTool
  ) {
    this.agent = new Agent<AIExecutionContext, typeof tripPlannerOutputSchema>({
      name: "trip planner",
      model: "gpt-5-nano",
      instructions:
        "you are an agent that provides exciting and interesting trips for user mainly focused " +
        "on the places and returns the trip. " +
        "You must save the trip, briefly describe it and verify all provided places exist before including them into " +
        "final list. Aim for maximum 10 places (minimum must be 2 places), best aim for between 4 and 7.",
      tools: [webSearchTool(), verifyPlaceTool.getTool()],
      modelSettings: {
        toolChoice: "required",
      },
      outputType: tripPlannerOutputSchema,
    });
  }

  public async execute(data: TripPlannerInput, userId: string): Promise<CreateTripDto> {
    const result = await run(this.agent, data.content, {
      context: {
        userId,
      } satisfies AIExecutionContext,
      maxTurns: 25,
    });

    const initialTrip = result.finalOutput;
    if (!initialTrip) {
      throw new ServerError("Generating trip failed");
    }

    return await this.preprocessTrip(initialTrip);
  }

  private async preprocessTrip(response: TripPlannerOutput): Promise<CreateTripDto> {
    const tripPoints = await Promise.all(
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
            city: place.city,
            country: place.country,
          };
        } catch {
          return null;
        }
      })
    );

    return {
      tripPoints: tripPoints.filter((x) => !!x),
      name: `${response.name} [AI]`,
      isProposal: true,
      description: response.description,
    };
  }
}
