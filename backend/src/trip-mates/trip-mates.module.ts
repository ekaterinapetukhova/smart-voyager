import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { TripMatesController } from "./trip-mates.controller";
import { GetAllTripMatesService } from "./service/get-all-trip-mates.service";

@Module({
  controllers: [TripMatesController],
  providers: [GetAllTripMatesService],
  imports: [PrismaModule],
})
export class TripMatesModule {}
