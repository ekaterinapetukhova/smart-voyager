import { Module } from "@nestjs/common";
import { GeoapifyModule } from "../geoapify/geoapify.module";
import { TripModule } from "../trip/trip.module";
import { UserModule } from "../user/user.module";
import { OpenaiController } from "./openai.controller";
import { FindEventsAroundAgent } from "./agents/find-events-around.agent";
import { TripPlannerAgent } from "./agents/trip-planner.agent";
import { VerifyPlaceTool } from "./tools/verify-place.tool";
import { ControlListCreatorAgent } from "./agents/control-list-creator.agent";

@Module({
  controllers: [OpenaiController],
  providers: [FindEventsAroundAgent, TripPlannerAgent, VerifyPlaceTool, ControlListCreatorAgent],
  imports: [GeoapifyModule, TripModule, UserModule],
})
export class AIModule {}
