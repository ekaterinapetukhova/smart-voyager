import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { GeneratePdfService } from "./service/generate-pdf.service";
import { PdfController } from "./pdf.controller";

@Module({
  imports: [PrismaModule],
  controllers: [PdfController],
  providers: [GeneratePdfService],
  exports: [GeneratePdfService],
})
export class PdfModule {}
