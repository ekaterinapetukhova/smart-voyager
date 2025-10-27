import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GetPlannedTripsService {
  public constructor(private readonly prisma: PrismaService) {}

  public execute(userId: string): Promise<Prisma.TripGetPayload<{ include: { event: true; controlList: true } }>[]> {
    return this.prisma.trip.findMany({
      where: {
        userId,
        event: {
          isNot: null,
        },
      },
      include: {
        event: true,
        controlList: true,
      },
      orderBy: {
        event: {
          from: "desc",
        },
      },
    });
  }
}
