import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { GeoapifyModule } from "../geoapify/geoapify.module";
import { RouteController } from "./route.controller";
import { CreateRouteService } from "./service/create-route.service";
import { GetAllRoutesService } from "./service/get-all-routes.service";
import { GetRoutesByUserService } from "./service/get-routes-by-user.service";

@Module({
  controllers: [RouteController],
  providers: [CreateRouteService, GetAllRoutesService, GetRoutesByUserService],
  imports: [PrismaModule, GeoapifyModule],
  exports: [GetRoutesByUserService],
})
export class RouteModule {}
