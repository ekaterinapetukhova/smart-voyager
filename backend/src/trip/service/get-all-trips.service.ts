import { Injectable } from "@nestjs/common";
import { Trip } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GetAllTripsService {
  public constructor(private readonly prisma: PrismaService) {}

  public execute(): Promise<Trip[]> {
    return this.prisma.trip.findMany({
      include: {
        tripPoints: true,
      },
    });
  }
}
