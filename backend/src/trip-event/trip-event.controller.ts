import { Body, Controller, Post } from "@nestjs/common";
import { TripEvent } from "@prisma/client";
import { UpsertEventService } from "./service/upsert-event.service";
import { tripEventDtoSchema } from "./dto/trip-event.dto";

@Controller("trip-event")
export class TripEventController {
  public constructor(private readonly createEventService: UpsertEventService) {}

  @Post()
  public add(@Body() data: unknown): Promise<TripEvent> {
    const createEventDto = tripEventDtoSchema.parse(data);

    return this.createEventService.execute(createEventDto);
  }
}
