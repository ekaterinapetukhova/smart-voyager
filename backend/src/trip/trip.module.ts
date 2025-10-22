import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { GeoapifyModule } from "../geoapify/geoapify.module";
import { TripController } from "./trip.controller";
import { CreateTripService } from "./service/create-trip.service";
import { GetAllTripsService } from "./service/get-all-trips.service";
import { GetTripsByUserService } from "./service/get-trips-by-user.service";
import { GetTripByIdService } from "./service/get-trip-by-id.service";
import { UpdateTripService } from "./service/update-trip.service";

@Module({
  controllers: [TripController],
  providers: [CreateTripService, GetAllTripsService, GetTripsByUserService, GetTripByIdService, UpdateTripService],
  imports: [PrismaModule, GeoapifyModule],
  exports: [GetTripsByUserService, CreateTripService],
})
export class TripModule {}
