import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { CreateEventService } from "./service/create-event.service";
import { TripEventController } from "./trip-event.controller";
import { GetEventService } from "./service/get-event.service";

@Module({
  controllers: [TripEventController],
  providers: [CreateEventService, GetEventService],
  imports: [PrismaModule],
})
export class TripEventModule {}
