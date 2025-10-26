import { Injectable } from "@nestjs/common";
import { TripEvent } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { NotFoundError } from "../../error/not-found.error";

@Injectable()
export class GetEventService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(id: string): Promise<TripEvent> {
    const event = await this.prisma.tripEvent.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundError("Event not found with id", id);
    }

    return event;
  }
}
