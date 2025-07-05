import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { RoutePointModule } from "./route-point/route-point.module";
import { RouteModule } from "./route/route.module";
import { UserModule } from "./user/user.module";
import { ZodValidationErrorFilter } from "./exceptions/zod-validation.exception";

@Module({
  imports: [PrismaModule, RoutePointModule, RouteModule, UserModule],
  controllers: [],
  providers: [ZodValidationErrorFilter],
})
export class AppModule {}
