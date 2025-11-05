import { Injectable } from "@nestjs/common";
import Jwt from "jsonwebtoken";
import { z } from "zod/v4";
import { PrismaService } from "../../prisma/prisma.service";
import { config } from "../../config/config";

@Injectable()
export class UpdateUserVerifiedStatusService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(verifyToken: string): Promise<{ token: string }> {
    const verifyPayload = this.verifyToken(verifyToken);

    const user = await this.prisma.user.update({
      where: {
        email: verifyPayload.email,
      },
      data: {
        verified: true,
      },
    });

    const payload = {
      id: user.id,
    };

    const token = Jwt.sign(payload, config.secretKey, {
      expiresIn: "1d",
    });

    return { token };
  }

  private verifyToken(token: string): { email: string } {
    const payload = Jwt.verify(token, config.secretKey);

    const payloadSchema = z.object({
      email: z.email(),
    });

    return payloadSchema.parse(payload);
  }
}
