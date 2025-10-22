import { Injectable } from "@nestjs/common";
import { Trip } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { NotFoundError } from "../../error/not-found.error";

@Injectable()
export class GetTripByIdService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(tripId: string): Promise<Trip> {
    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId },
      include: { tripPoints: { orderBy: { index: "asc" } } },
    });

    if (!trip) {
      throw new NotFoundError("Trip", tripId);
    }

    return trip;
  }
}
