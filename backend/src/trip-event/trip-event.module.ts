import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UpsertEventService } from "./service/upsert-event.service";
import { TripEventController } from "./trip-event.controller";
import { GetEventService } from "./service/get-event.service";

@Module({
  controllers: [TripEventController],
  providers: [UpsertEventService, GetEventService],
  imports: [PrismaModule],
})
export class TripEventModule {}
