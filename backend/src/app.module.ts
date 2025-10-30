import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { TripModule } from "./trip/trip.module";
import { UserModule } from "./user/user.module";
import { ZodErrorExceptionFilter } from "./api/zod-error.exception-filter";
import { GeoapifyModule } from "./geoapify/geoapify.module";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { MeModule } from "./me/me.module";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { TripMatesModule } from "./trip-mates/trip-mates.module";
import { FilesModule } from "./files/files.module";
import { ChatModule } from "./chat/chat.module";
import { AIModule } from "./openai/openai.module";
import { TripPointModule } from "./trip-point/trip-point.module";
import { TripEventModule } from "./trip-event/trip-event.module";
import { PdfModule } from "./pdf/pdf.module";

@Module({
  imports: [
    PrismaModule,
    TripModule,
    UserModule,
    GeoapifyModule,
    AuthModule,
    MailModule,
    MeModule,
    TripMatesModule,
    TripPointModule,
    FilesModule,
    ChatModule,
    AIModule,
    TripEventModule,
    PdfModule,
  ],
  controllers: [],
  providers: [ZodErrorExceptionFilter],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).exclude("auth/*", "user").forRoutes("*");
  }
}
