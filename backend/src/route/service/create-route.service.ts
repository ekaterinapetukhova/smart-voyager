import { Injectable } from "@nestjs/common";
import { Prisma, Route, User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateRouteDto } from "../dto/create-route.dto";

@Injectable()
export class CreateRouteService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(data: CreateRouteDto, user: User): Promise<Route> {
    const createData: Prisma.RouteCreateInput = {
      name: data.name,
      mode: data.mode,
      type: data.type,
      isProposal: data.isProposal,
      description: data.description,
      waypoints: {
        create: data.waypoints.map((waypoint, i) => ({
          index: i,
          latitude: waypoint.latitude,
          longitude: waypoint.longitude,
          name: waypoint.name,
          fullAddress: waypoint.fullAddress,
        })),
      },
      user: { connect: { id: user?.id } },
    };

    return this.prisma.route.create({
      data: createData,
    });
  }
}
