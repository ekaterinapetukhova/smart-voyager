import { Injectable } from "@nestjs/common";
import { Trip } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GetTripsByUserService {
  public constructor(private readonly prisma: PrismaService) {}

  public execute(userId: string): Promise<Trip[]> {
    return this.prisma.trip.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tripPoints: true,
      },
    });
  }
}
