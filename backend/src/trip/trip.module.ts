import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { GeoapifyModule } from "../geoapify/geoapify.module";
import { AIModule } from "../openai/openai.module";
import { TripController } from "./trip.controller";
import { CreateTripService } from "./service/create-trip.service";
import { GetPlannedTripsService } from "./service/get-planned-trips.service";
import { GetTripByIdService } from "./service/get-trip-by-id.service";
import { UpdateTripService } from "./service/update-trip.service";
import { GetAllDraftTripsService } from "./service/get-all-draft-trips.sevice";
import { CreateControlListItemService } from "./service/control-list-item/create-control-list.service";

@Module({
  controllers: [TripController],
  providers: [
    CreateTripService,
    GetAllDraftTripsService,
    GetPlannedTripsService,
    GetTripByIdService,
    UpdateTripService,
    CreateControlListItemService,
  ],
  imports: [PrismaModule, GeoapifyModule, AIModule],
  exports: [CreateTripService, GetTripByIdService, CreateControlListItemService],
})
export class TripModule {}
