import fs from "fs/promises";
import { Controller, Param, ParseUUIDPipe, Post, Req, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { GeneratePdfService } from "./service/generate-pdf.service";

@Controller("pdf")
export class PdfController {
  public constructor(private readonly generatePdfService: GeneratePdfService) {}

  @Post(":tripId")
  public async generate(@Req() req: Request, @Param("tripId", ParseUUIDPipe) tripId: string): Promise<void> {
    const token = req.header("authorization");

    if (!token) {
      throw new UnauthorizedException();
    }
    const pdf = await this.generatePdfService.execute(token, tripId);

    await fs.writeFile("trip.pdf", pdf);
  }
}
