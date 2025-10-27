import { Body, Controller, Post } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "../auth/user.decorator";
import { ServerError } from "../error/server.error";
import { TripPlannerAgent, tripPlannerInputSchema } from "./agents/trip-planner.agent";

@Controller("ai")
export class OpenaiController {
  public constructor(private readonly tripPlannerAgent: TripPlannerAgent) {}

  @Post("suggest-trip")
  public async suggestTrip(@GetUser() user: User, @Body() body: unknown): Promise<{ tripId: string } | undefined> {
    const data = tripPlannerInputSchema.parse(body);

    const tripId = await this.tripPlannerAgent.execute(data, user.id);

    if (!tripId) {
      throw new ServerError("Trip creation failed");
    }

    return {
      tripId,
    };
  }
}
