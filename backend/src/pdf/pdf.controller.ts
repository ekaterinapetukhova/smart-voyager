import { Controller, Param, ParseUUIDPipe, Post, Req, StreamableFile, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { GeneratePdfService } from "./service/generate-pdf.service";

@Controller("pdf")
export class PdfController {
  public constructor(private readonly generatePdfService: GeneratePdfService) {}

  @Post(":tripId")
  public async generate(@Req() req: Request, @Param("tripId", ParseUUIDPipe) tripId: string): Promise<StreamableFile> {
    const token = req.header("authorization");

    if (!token) {
      throw new UnauthorizedException();
    }

    return new StreamableFile(await this.generatePdfService.execute(token, tripId));
  }
}
