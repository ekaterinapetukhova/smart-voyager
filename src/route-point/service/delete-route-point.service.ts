import { Injectable } from "@nestjs/common";
import { RoutePoint } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { NotFoundException } from "../../exceptions/not-found.exception";

@Injectable()
export class DeleteRoutePointService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(id: string): Promise<RoutePoint> {
    const routePoint = await this.prisma.routePoint.findUnique({ where: { id } });

    if (!routePoint) {
      throw new NotFoundException("RoutePoint not found", id);
    }

    return this.prisma.routePoint.delete({
      where: { id },
    });
  }
}
