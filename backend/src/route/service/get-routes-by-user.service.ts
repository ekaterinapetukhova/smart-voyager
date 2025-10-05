import { Injectable } from "@nestjs/common";
import { Route } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GetRoutesByUserService {
  public constructor(private readonly prisma: PrismaService) {}

  public execute(userId: string): Promise<Route[]> {
    return this.prisma.route.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
