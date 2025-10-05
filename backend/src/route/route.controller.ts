import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { Route, User } from "@prisma/client";
import { GetUser } from "../auth/user.decorator";
import { CreateRouteService } from "./service/create-route.service";
import { createRouteDtoSchema } from "./dto/create-route.dto";
import { GetAllRoutesService } from "./service/get-all-routes.service";
import { GetRouteByIdService } from "./service/get-route-by-id.service";

@Controller("route")
export class RouteController {
  public constructor(
    private readonly createRouteService: CreateRouteService,
    private readonly getAllRoutesService: GetAllRoutesService,
    private readonly getRouteByIdService: GetRouteByIdService
  ) {}

  @Post()
  public create(@Body() data: unknown, @GetUser() user: User): Promise<Route> {
    const createRouteDto = createRouteDtoSchema.parse(data);

    return this.createRouteService.execute(createRouteDto, user);
  }

  @Get()
  public getAll(): Promise<Route[]> {
    return this.getAllRoutesService.execute();
  }

  @Get(":id")
  public getById(@Param("id", ParseUUIDPipe) id: string): Promise<Route> {
    return this.getRouteByIdService.execute(id);
  }
}
