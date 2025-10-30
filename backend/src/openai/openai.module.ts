import { Module } from "@nestjs/common";
import { GeoapifyModule } from "../geoapify/geoapify.module";
import { UserModule } from "../user/user.module";
import { FindEventsAroundAgent } from "./agents/find-events-around.agent";
import { TripPlannerAgent } from "./agents/trip-planner.agent";
import { VerifyPlaceTool } from "./tools/verify-place.tool";
import { ControlListCreatorAgent } from "./agents/control-list-creator.agent";

@Module({
  providers: [FindEventsAroundAgent, TripPlannerAgent, VerifyPlaceTool, ControlListCreatorAgent],
  imports: [GeoapifyModule, UserModule],
  exports: [TripPlannerAgent, ControlListCreatorAgent, FindEventsAroundAgent],
})
export class AIModule {}
