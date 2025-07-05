import { Injectable } from "@nestjs/common";
import { RoutePoint } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GetAllRoutePointService {
  public constructor(private readonly prisma: PrismaService) {}

  public execute(): Promise<RoutePoint[]> {
    return this.prisma.routePoint.findMany();
  }
}
