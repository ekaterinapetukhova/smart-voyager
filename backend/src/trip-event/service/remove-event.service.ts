import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class RemoveEventService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(tripId: string): Promise<void> {
    await this.prisma.tripEvent.delete({
      where: {
        tripId,
      },
    });
  }
}
