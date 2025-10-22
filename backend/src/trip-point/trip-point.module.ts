import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { TripModule } from "../trip/trip.module";
import { TripPointController } from "./trip-point.controller";
import { CreateTripPointService } from "./service/create-trip-point.service";
import { RemoveTripPointService } from "./service/remove-trip-point.service";
import { UpdateTripPointService } from "./service/update-trip-point.service";
import { SwapTripPointsService } from "./service/swap-trip-points.service";

@Module({
  controllers: [TripPointController],
  providers: [CreateTripPointService, RemoveTripPointService, UpdateTripPointService, SwapTripPointsService],
  imports: [PrismaModule, TripModule],
})
export class TripPointModule {}
