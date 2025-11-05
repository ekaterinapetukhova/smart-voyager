import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class RemoveTripService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(tripId: string): Promise<void> {
    await this.prisma.trip.delete({
      where: {
        id: tripId,
      },
      include: {
        tripPoints: true,
      },
    });
  }
}
