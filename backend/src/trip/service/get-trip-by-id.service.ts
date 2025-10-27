import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { NotFoundError } from "../../error/not-found.error";

export const orderedTripPointsIncludePart: Prisma.TripInclude = { tripPoints: { orderBy: { index: "asc" } } };

@Injectable()
export class GetTripByIdService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute<T extends Prisma.TripInclude>(
    tripId: string,
    include: T
  ): Promise<
    Prisma.TripGetPayload<{
      include: T;
    }>
  > {
    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId },
      include,
    });

    if (!trip) {
      throw new NotFoundError("Trip", tripId);
    }

    return trip;
  }
}
