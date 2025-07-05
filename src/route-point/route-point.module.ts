import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { RoutePointController } from "./route-point.controller";
import { GetAllRoutePointService } from "./service/get-all-route-point.service";
import { DeleteRoutePointService } from "./service/delete-route-point.service";

@Module({
  controllers: [RoutePointController],
  providers: [GetAllRoutePointService, DeleteRoutePointService],
  imports: [PrismaModule],
})
export class RoutePointModule {}
