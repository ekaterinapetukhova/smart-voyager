import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { RouteModule } from "../route/route.module";
import { FilesModule } from "../files/files.module";
import { MeController } from "./me.controller";
import { GetMeService } from "./service/get-me.service";

@Module({
  imports: [PrismaModule, UserModule, RouteModule, FilesModule],
  controllers: [MeController],
  providers: [GetMeService],
})
export class MeModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(MeController);
  }
}
