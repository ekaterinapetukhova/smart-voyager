import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { GetUserByIdService } from "./service/get-user-by-id.service";
import { CreateUserService } from "./service/create-user.service";
import { GetUserByEmailService } from "./service/get-user-by-email.service";
import { UserController } from "./user.controller";
import { GetAllUsersService } from "./service/get-all-users-service";
import { UpdateUserVerifiedStatusService } from "./service/update-user-verified-status.service";

@Module({
  controllers: [UserController],
  providers: [
    GetUserByIdService,
    CreateUserService,
    GetUserByEmailService,
    GetAllUsersService,
    UpdateUserVerifiedStatusService,
  ],
  imports: [PrismaModule],
  exports: [GetUserByEmailService, CreateUserService, UpdateUserVerifiedStatusService, GetUserByEmailService],
})
export class UserModule {}
