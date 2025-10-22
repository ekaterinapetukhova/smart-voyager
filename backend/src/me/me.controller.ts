import { Controller, Get } from "@nestjs/common";
import { Trip, User } from "@prisma/client";
import { GetUser } from "../auth/user.decorator";
import { GetMeDto } from "../auth/dto/get-me.dto";
import { GetTripsByUserService } from "../trip/service/get-trips-by-user.service";
import { GetMeService } from "./service/get-me.service";

@Controller("me")
export class MeController {
  public constructor(
    private readonly getMeService: GetMeService,
    private readonly getTripsByUserService: GetTripsByUserService
  ) {}

  @Get()
  public async getMe(@GetUser() user: User): Promise<GetMeDto> {
    return await this.getMeService.execute(user);
  }

  @Get("trips")
  public getTrips(@GetUser() user: User): Promise<Trip[]> {
    return this.getTripsByUserService.execute(user.id);
  }
}
