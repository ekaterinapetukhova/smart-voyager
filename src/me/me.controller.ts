import { Controller, Get } from "@nestjs/common";
import { Route, User } from "@prisma/client";
import { GetUser } from "../auth/user.decorator";
import { GetMeDto } from "../auth/dto/get-me.dto";
import { GetRoutesByUserService } from "../route/service/get-routes-by-user.service";

@Controller("me")
export class MeController {
  public constructor(private readonly getRoutesByUserService: GetRoutesByUserService) {}

  @Get()
  public getMe(@GetUser() user: User): GetMeDto {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    };
  }

  @Get("routes")
  public getRoutes(@GetUser() user: User): Promise<Route[]> {
    return this.getRoutesByUserService.execute(user.id);
  }
}
