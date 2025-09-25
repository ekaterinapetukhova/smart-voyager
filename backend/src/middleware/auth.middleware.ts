import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request } from "express";
import Jwt from "jsonwebtoken";
import { z } from "zod/v4";
import { User } from "@prisma/client";
import { config } from "../config/config";
import { PrismaService } from "../prisma/prisma.service";

type RequestWithUser = Request & { user: User };

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  public constructor(private readonly prisma: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async use(req: RequestWithUser, _res: any, next: NextFunction): Promise<void> {
    const token = this.extractToken(req);

    if (!token) {
      throw new UnauthorizedException({
        errorMessage: "No token provided",
      });
    }

    const payload = this.verifyToken(token);

    const user = await this.prisma.user.findFirst({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    req["user"] = user;

    next();
  }

  private extractToken(req: Request): string | undefined {
    const [type, token] = req.headers["authorization"]?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }

  private verifyToken(token: string): { id: string } {
    const payloadSchema = z.object({
      id: z.uuid(),
    });

    const payload = Jwt.verify(token, config.secretKey);

    const validPayload = payloadSchema.safeParse(payload);

    if (!validPayload.success) {
      throw new UnauthorizedException();
    }

    return validPayload.data;
  }
}
