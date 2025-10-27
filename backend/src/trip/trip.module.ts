import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { GeoapifyModule } from "../geoapify/geoapify.module";
import { TripController } from "./trip.controller";
import { CreateTripService } from "./service/create-trip.service";
import { GetPlannedTripsService } from "./service/get-planned-trips.service";
import { GetTripByIdService } from "./service/get-trip-by-id.service";
import { UpdateTripService } from "./service/update-trip.service";
import { GetAllDraftTripsService } from "./service/get-all-draft-trips.sevice";

@Module({
  controllers: [TripController],
  providers: [
    CreateTripService,
    GetAllDraftTripsService,
    GetPlannedTripsService,
    GetTripByIdService,
    UpdateTripService,
  ],
  imports: [PrismaModule, GeoapifyModule],
  exports: [CreateTripService, GetTripByIdService],
})
export class TripModule {}
