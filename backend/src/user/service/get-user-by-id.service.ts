import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { NotFoundError } from "../../error/not-found.error";

@Injectable()
export class GetUserByIdService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundError("User not found", id);
    }

    return user;
  }
}
