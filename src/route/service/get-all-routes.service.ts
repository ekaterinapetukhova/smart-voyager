import { Injectable } from "@nestjs/common";
import { Route } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GetAllRoutesService {
  public constructor(private readonly prisma: PrismaService) {}

  public execute(): Promise<Route[]> {
    return this.prisma.route.findMany({
      include: {
        points: true,
      },
    });
  }
}
