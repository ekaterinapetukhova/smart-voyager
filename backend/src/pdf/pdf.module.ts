import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { MeController } from "../me/me.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { GeneratePdfService } from "./service/generate-pdf.service";
import { PdfController } from "./pdf.controller";

@Module({
  imports: [PrismaModule],
  controllers: [PdfController],
  providers: [GeneratePdfService],
  exports: [GeneratePdfService],
})
export class PdfModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(MeController);
  }
}
