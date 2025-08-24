import { Controller, Get } from "@nestjs/common";
import { Route, User } from "@prisma/client";
import { GetUser } from "../auth/user.decorator";
import { GetMeDto } from "../auth/dto/get-me.dto";
import { GetRoutesByUserService } from "../route/service/get-routes-by-user.service";
import { GetMeService } from "./service/get-me.service";

@Controller("me")
export class MeController {
  public constructor(
    private readonly getMeService: GetMeService,
    private readonly getRoutesByUserService: GetRoutesByUserService
  ) {}

  @Get()
  public async getMe(@GetUser() user: User): Promise<GetMeDto> {
    return await this.getMeService.execute(user);
  }

  @Get("routes")
  public getRoutes(@GetUser() user: User): Promise<Route[]> {
    return this.getRoutesByUserService.execute(user.id);
  }
}
