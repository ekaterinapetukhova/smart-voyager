import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { MailService } from "./mail.service";

@Module({
  providers: [MailService],
  exports: [MailService],
  imports: [UserModule],
})
export class MailModule {}
