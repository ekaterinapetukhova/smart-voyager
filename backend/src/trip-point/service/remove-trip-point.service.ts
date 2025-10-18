import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class RemoveTripPointService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(id: string): Promise<void> {
    await this.prisma.routeWaypoint.delete({
      where: {
        id,
      },
    });
  }
}
