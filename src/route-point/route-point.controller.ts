import { Controller, Delete, Get, Param } from "@nestjs/common";
import { RoutePoint } from "@prisma/client";
import { z } from "zod";
// import { CreateRoutePointService } from "./service/create-route-point.service";
import { GetAllRoutePointService } from "./service/get-all-route-point.service";
import { DeleteRoutePointService } from "./service/delete-route-point.service";

@Controller("route-point")
export class RoutePointController {
  public constructor(
    // private readonly createRoutePointerService: CreateRoutePointService,
    private readonly getAllRoutePointersService: GetAllRoutePointService,
    private readonly deleteRoutePointerService: DeleteRoutePointService
  ) {}

  @Get()
  public getAll(): Promise<RoutePoint[]> {
    return this.getAllRoutePointersService.execute();
  }

  // @Post()
  // public create(@Body() data: unknown): Promise<RoutePoint> {
  //   const createRoutePointDto = createRoutePointDtoSchema.parse(data);
  //
  //   return this.createRoutePointerService.execute(createRoutePointDto);
  // }

  @Delete(":id")
  public delete(@Param("id") id: unknown): Promise<RoutePoint> {
    const parsedId = z.string().uuid().parse(id);

    return this.deleteRoutePointerService.execute(parsedId);
  }
}
