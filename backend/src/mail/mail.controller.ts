// import { Controller, Patch, Query } from "@nestjs/common";
// import { User } from "@prisma/client";
// import { UpdateUserVerifiedStatusService } from "../user/service/update-user-verified-status.service";
//
// @Controller("verify-mail")
// export class MailController {
//   public constructor(private readonly updateUserVerifiedStatusService: UpdateUserVerifiedStatusService) {}
//
//   @Patch()
//   public updateUserVerifiedStatus(@Query("token") token: string): Promise<User> {
//     return this.updateUserVerifiedStatusService.execute(token);
//   }
// }
