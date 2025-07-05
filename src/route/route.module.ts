import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { RouteController } from "./route.controller";
import { CreateRouteService } from "./service/create-route.service";
import { GetAllRoutesService } from "./service/get-all-routes.service";

@Module({
  controllers: [RouteController],
  providers: [CreateRouteService, GetAllRoutesService],
  imports: [PrismaModule],
})
export class RouteModule {}
