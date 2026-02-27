import { Body, Controller, Delete, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { TripEvent } from "@prisma/client";
import { UpsertEventService } from "./service/upsert-event.service";
import { tripEventDtoSchema } from "./dto/trip-event.dto";
import { RemoveEventService } from "./service/remove-event.service";

@Controller("trip-event")
export class TripEventController {
  public constructor(
    private readonly createEventService: UpsertEventService,
    private readonly removeEventService: RemoveEventService
  ) {}

  @Post()
  public add(@Body() data: unknown): Promise<TripEvent> {
    const createEventDto = tripEventDtoSchema.parse(data);

    return this.createEventService.execute(createEventDto);
  }

  @Delete(":tripId")
  public delete(@Param("tripId", ParseUUIDPipe) tripId: string): Promise<void> {
    return this.removeEventService.execute(tripId);
  }
}
