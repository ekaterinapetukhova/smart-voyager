import { Injectable } from "@nestjs/common";
import { TripEvent } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTripEventDto } from "../dto/create-trip-event.dto";

@Injectable()
export class CreateEventService {
  public constructor(private readonly prisma: PrismaService) {}

  public execute(data: CreateTripEventDto): Promise<TripEvent> {
    return this.prisma.tripEvent.create({
      data,
    });
  }
}
