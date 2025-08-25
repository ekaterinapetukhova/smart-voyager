import { Controller, Get } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "../auth/user.decorator";
import { GetAllTripMatesService } from "./service/get-all-trip-mates.service";

@Controller("trip-mates")
export class TripMatesController {
  public constructor(private readonly getAllTripMatesService: GetAllTripMatesService) {}

  @Get()
  public async execute(@GetUser() user: User): Promise<User[]> {
    return this.getAllTripMatesService.execute(user.id);
  }
}
