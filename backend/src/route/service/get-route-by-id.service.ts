import { Injectable } from "@nestjs/common";
import { Route } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { NotFoundError } from "../../error/not-found.error";

@Injectable()
export class GetRouteByIdService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(routeId: string): Promise<Route> {
    const route = await this.prisma.route.findUnique({ where: { id: routeId } });

    if (!route) {
      throw new NotFoundError("Route", routeId);
    }

    return route;
  }
}
