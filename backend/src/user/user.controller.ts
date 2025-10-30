import { Body, Controller, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { User } from "@prisma/client";
import { createUserDtoSchema } from "./dto/create-user.dto";
import { CreateUserService } from "./service/create-user.service";
import { updateUserDtoSchema } from "./dto/update-user.dto";
import { UpdateUserInformationService } from "./service/update-user-information.service";

@Controller("user")
export class UserController {
  public constructor(
    private readonly createUserService: CreateUserService,
    private readonly updateUserInformationService: UpdateUserInformationService
  ) {}

  //
  // @Get()
  // public getAll(): Promise<User[]> {
  //   return this.getAllUsersService.execute();
  // }
  //
  // @Get(":id")
  // public getById(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
  //   return this.getUserByIdService.execute(id);
  // }

  @Post()
  public create(@Body() data: unknown): Promise<User> {
    const createUserDto = createUserDtoSchema.parse(data);

    return this.createUserService.execute(createUserDto);
  }

  @Patch(":id")
  public async update(@Param("id", ParseUUIDPipe) id: string, @Body() data: unknown): Promise<void> {
    console.log(data);
    const updateUserDto = updateUserDtoSchema.parse(data);

    await this.updateUserInformationService.execute(id, updateUserDto);
  }
}
