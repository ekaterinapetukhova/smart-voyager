import { Controller, Get } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "../auth/user.decorator";
import { GetMeDto } from "../auth/dto/get-me.dto";
import { GetMeService } from "./service/get-me.service";

@Controller("me")
export class MeController {
  public constructor(private readonly getMeService: GetMeService) {}

  @Get()
  public async getMe(@GetUser() user: User): Promise<GetMeDto> {
    return await this.getMeService.execute(user);
  }
}
