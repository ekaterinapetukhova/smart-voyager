import { Injectable } from "@nestjs/common";
import { TripPoint } from "@prisma/client";
import { CreateTripPointDto } from "../dto/create-trip-point.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { ServerError } from "../../error/server.error";

@Injectable()
export class CreateTripPointService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(data: CreateTripPointDto): Promise<TripPoint> {
    const maxIndex = await this.prisma.tripPoint.aggregate({
      _max: {
        index: true,
      },
      where: {
        tripId: data.tripId,
      },
    });

    if (maxIndex._max.index === null) {
      throw new ServerError("unluck max index didn't find");
    }

    return this.prisma.tripPoint.create({
      data: {
        index: maxIndex._max.index + 1,
        tripId: data.tripId,
        latitude: data.latitude,
        longitude: data.longitude,
        name: data.name,
        fullAddress: data.fullAddress,
      },
    });
  }
}
