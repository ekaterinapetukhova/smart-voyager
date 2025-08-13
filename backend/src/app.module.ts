import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { RouteModule } from "./route/route.module";
import { UserModule } from "./user/user.module";
import { ZodErrorExceptionFilter } from "./api/zod-error.exception-filter";
import { GeoapifyModule } from "./geoapify/geoapify.module";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { MeModule } from "./me/me.module";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { TripMatesModule } from "./trip-mates/trip-mates.module";
import { FilesModule } from "./files/files.module";

@Module({
  imports: [
    PrismaModule,
    RouteModule,
    UserModule,
    GeoapifyModule,
    AuthModule,
    MailModule,
    MeModule,
    TripMatesModule,
    FilesModule,
  ],
  controllers: [],
  providers: [ZodErrorExceptionFilter],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).exclude("auth/*").forRoutes("*");
  }
}
