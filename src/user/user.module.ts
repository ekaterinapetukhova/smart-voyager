import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { GetUserByIdService } from "./service/get-user-by-id.service";
import { CreateUserService } from "./service/create-user.service";
import { GetUserByEmailService } from "./service/get-user-by-email.service";
import { UserController } from "./user.controller";

@Module({
  controllers: [UserController],
  providers: [GetUserByIdService, CreateUserService, GetUserByEmailService],
  imports: [PrismaModule],
})
export class UserModule {}
