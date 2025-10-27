import { Injectable } from "@nestjs/common";
import { Prisma, Trip } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTripDto } from "../dto/create-trip.dto";

@Injectable()
export class CreateTripService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(data: CreateTripDto, userId: string): Promise<Trip> {
    const createData: Prisma.TripCreateInput = {
      name: data.name,
      isProposal: data.isProposal,
      description: data.description,
      tripPoints: {
        create: data.tripPoints.map((point, i) => ({
          index: i,
          latitude: point.latitude,
          longitude: point.longitude,
          name: point.name,
          fullAddress: point.fullAddress,
          city: point.city,
          country: point.country,
        })),
      },
      user: { connect: { id: userId } },
    };

    return this.prisma.trip.create({
      data: createData,
    });
  }
}
