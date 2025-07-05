// import { Injectable } from "@nestjs/common";
// import { RoutePoint } from "@prisma/client";
// import { PrismaService } from "../../prisma/prisma.service";
// import { CreateRoutePointDto } from "../dto/create-route-point.dto";
//
// @Injectable()
// export class CreateRoutePointService {
//   public constructor(private readonly prisma: PrismaService) {}
//
//   public async execute(data: CreateRoutePointDto): Promise<RoutePoint> {
//     return this.prisma.routePoint.create({
//       data,
//     });
//   }
// }
