import { Injectable } from "@nestjs/common";
import { Prisma, Route, User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateRouteDto } from "../dto/create-route.dto";
import {
  GeoapifyRoutesApiClient,
  GeoapifyRoutesApiClientInput,
} from "../../geoapify/service/geoapify-routes-api-client";

@Injectable()
export class CreateRouteService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly geoapifyRoutesApiClient: GeoapifyRoutesApiClient
  ) {}

  public async execute(data: CreateRouteDto, user: User): Promise<Route> {
    const input: GeoapifyRoutesApiClientInput = {
      mode: data.mode,
      waypoints: data.waypoints.map((w) => `${w.latitude},${w.longitude}`).join("|"),
      type: data.type,
    };

    const response = await this.geoapifyRoutesApiClient.getRoute(input);

    const createData: Prisma.RouteCreateInput = {
      name: data.name,
      mode: data.mode,
      type: data.type,
      isProposal: data.isProposal,
      geojson: JSON.stringify(response),
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
