import { Body, Controller, Post } from "@nestjs/common";
import { TripEvent } from "@prisma/client";
import { CreateEventService } from "./service/create-event.service";
import { createEventDtoSchema } from "./dto/create-trip-event.dto";

@Controller("trip-event")
export class TripEventController {
  public constructor(private readonly createEventService: CreateEventService) {}

  @Post()
  public add(@Body() data: unknown): Promise<TripEvent> {
    const createEventDto = createEventDtoSchema.parse(data);

    return this.createEventService.execute(createEventDto);
  }
}
