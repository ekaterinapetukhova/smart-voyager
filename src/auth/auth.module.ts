import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { LoginService } from "./service/login.service";
import { RegisterService } from "./service/register.service";

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [],
  providers: [LoginService, RegisterService],
})
export class AuthModule {}
