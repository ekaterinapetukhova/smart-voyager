import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUserByIdService } from "./service/get-user-by-id.service";
import { createUserDtoSchema } from "./dto/create-user.dto";
import { CreateUserService } from "./service/create-user.service";

@Controller("user")
export class UserController {
  public constructor(
    private readonly getUserByIdService: GetUserByIdService,
    private readonly createUserService: CreateUserService
  ) {}

  @Get(":id")
  public getById(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
    return this.getUserByIdService.execute(id);
  }

  @Post()
  public create(@Body() data: unknown): Promise<User> {
    const createUserDto = createUserDtoSchema.parse(data);

    return this.createUserService.execute(createUserDto);
  }
}
