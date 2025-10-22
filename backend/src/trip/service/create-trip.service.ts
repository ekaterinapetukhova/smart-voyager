import { Injectable } from "@nestjs/common";
import { Prisma, Trip, User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTripDto } from "../dto/create-trip.dto";

@Injectable()
export class CreateTripService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(data: CreateTripDto, user: User): Promise<Trip> {
    const createData: Prisma.TripCreateInput = {
      name: data.name,
      isProposal: data.isProposal,
      description: data.description,
      tripPoints: {
        create: data.tripPoints.map((waypoint, i) => ({
          index: i,
          latitude: waypoint.latitude,
          longitude: waypoint.longitude,
          name: waypoint.name,
          fullAddress: waypoint.fullAddress,
        })),
      },
      user: { connect: { id: user?.id } },
    };

    return this.prisma.trip.create({
      data: createData,
    });
  }
}
