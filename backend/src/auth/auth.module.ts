import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { MailModule } from "../mail/mail.module";
import { LoginService } from "./service/login.service";
import { RegisterService } from "./service/register.service";
import { AuthController } from "./auth.controller";

@Module({
  imports: [PrismaModule, UserModule, MailModule],
  controllers: [AuthController],
  providers: [LoginService, RegisterService],
})
export class AuthModule {}
