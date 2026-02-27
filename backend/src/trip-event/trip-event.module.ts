import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UpsertEventService } from "./service/upsert-event.service";
import { TripEventController } from "./trip-event.controller";
import { GetEventService } from "./service/get-event.service";
import { RemoveEventService } from "./service/remove-event.service";

@Module({
  controllers: [TripEventController],
  providers: [UpsertEventService, GetEventService, RemoveEventService],
  imports: [PrismaModule],
})
export class TripEventModule {}
