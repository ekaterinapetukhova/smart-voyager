import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { TripModule } from "../trip/trip.module";
import { FilesModule } from "../files/files.module";
import { MeController } from "./me.controller";
import { GetMeService } from "./service/get-me.service";

@Module({
  imports: [PrismaModule, UserModule, TripModule, FilesModule],
  controllers: [MeController],
  providers: [GetMeService],
})
export class MeModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(MeController);
  }
}
