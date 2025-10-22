import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { SwapTripPointsDto } from "../dto/swap-trip-points.dto";
import { NotFoundError } from "../../error/not-found.error";

@Injectable()
export class SwapTripPointsService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(data: SwapTripPointsDto): Promise<void> {
    const firstIndex = await this.prisma.tripPoint.findUnique({
      where: {
        id: data.firstTripPointId,
      },
      select: {
        index: true,
      },
    });

    const secondIndex = await this.prisma.tripPoint.findUnique({
      where: {
        id: data.secondTripPointId,
      },
      select: {
        index: true,
      },
    });

    if (!firstIndex) {
      throw new NotFoundError("Trip point not found", data.firstTripPointId);
    }

    if (!secondIndex) {
      throw new NotFoundError("Trip point not found", data.secondTripPointId);
    }

    await this.prisma.tripPoint.update({
      where: {
        id: data.firstTripPointId,
      },
      data: {
        index: secondIndex.index,
      },
    });

    await this.prisma.tripPoint.update({
      where: {
        id: data.secondTripPointId,
      },
      data: {
        index: firstIndex.index,
      },
    });
  }
}
