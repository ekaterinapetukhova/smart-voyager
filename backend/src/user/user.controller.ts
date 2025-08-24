import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUserByIdService } from "./service/get-user-by-id.service";
import { createUserDtoSchema } from "./dto/create-user.dto";
import { CreateUserService } from "./service/create-user.service";
import { GetAllUsersService } from "./service/get-all-users-service";
import { updateUserDtoSchema } from "./dto/update-user.dto";
import { UpdateUserInformationService } from "./service/update-user-information.service";

@Controller("user")
export class UserController {
  public constructor(
    private readonly getUserByIdService: GetUserByIdService,
    private readonly createUserService: CreateUserService,
    private readonly getAllUsersService: GetAllUsersService,
    private readonly updateUserInformationService: UpdateUserInformationService
  ) {}

  @Get()
  public getAll(): Promise<User[]> {
    return this.getAllUsersService.execute();
  }

  @Get(":id")
  public getById(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
    return this.getUserByIdService.execute(id);
  }

  @Post()
  public create(@Body() data: unknown): Promise<User> {
    const createUserDto = createUserDtoSchema.parse(data);

    return this.createUserService.execute(createUserDto);
  }

  @Patch(":id")
  public update(@Param("id", ParseUUIDPipe) id: string, @Body() data: unknown): Promise<User> {
    console.log(data);
    const updateUserDto = updateUserDtoSchema.parse(data);

    return this.updateUserInformationService.execute(id, updateUserDto);
  }
}
