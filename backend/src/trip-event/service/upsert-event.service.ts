import { Injectable } from "@nestjs/common";
import { TripEvent } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { TripEventDto } from "../dto/trip-event.dto";

@Injectable()
export class UpsertEventService {
  public constructor(private readonly prisma: PrismaService) {}

  public execute(data: TripEventDto): Promise<TripEvent> {
    return this.prisma.tripEvent.upsert({
      where: {
        tripId: data.tripId,
      },
      update: {
        from: data.from,
        to: data.to,
      },
      create: {
        ...data,
      },
    });
  }
}
