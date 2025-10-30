import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AddTripMateService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(mateUserId: string, tripId: string): Promise<void> {
    await this.prisma.trip.update({
      where: {
        id: tripId,
      },
      data: {
        collaborators: {
          connect: {
            id: mateUserId,
          },
        },
      },
    });
  }
}
