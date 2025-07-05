import { Body, Controller, Get, Post } from "@nestjs/common";
import { Route } from "@prisma/client";
import { CreateRouteService } from "./service/create-route.service";
import { createRouteDtoSchema } from "./dto/create-route.dto";
import { GetAllRoutesService } from "./service/get-all-routes.service";

@Controller("route")
export class RouteController {
  public constructor(
    private readonly createRouteService: CreateRouteService,
    private readonly getAllRoutesService: GetAllRoutesService
  ) {}

  @Post()
  public create(@Body() data: unknown): Promise<Route> {
    const createRouteDto = createRouteDtoSchema.parse(data);

    return this.createRouteService.execute(createRouteDto);
  }

  @Get()
  public getAll(): Promise<Route[]> {
    return this.getAllRoutesService.execute();
  }
}
