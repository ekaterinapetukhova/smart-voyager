import { Injectable } from "@nestjs/common";
import Jwt from "jsonwebtoken";
import { z } from "zod";
import { PrismaService } from "../../prisma/prisma.service";
import { config } from "../../config/config";

@Injectable()
export class UpdateUserVerifiedStatusService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(token: string): Promise<void> {
    const payload = this.verifyToken(token);

    await this.prisma.user.update({
      where: {
        email: payload.email,
      },
      data: {
        verified: true,
      },
    });
  }

  private verifyToken(token: string): { email: string } {
    const payload = Jwt.verify(token, config.secretKey);

    const payloadSchema = z.object({
      email: z.string().email(),
    });

    return payloadSchema.parse(payload);
  }
}
