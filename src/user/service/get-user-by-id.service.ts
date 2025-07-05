import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { NotFoundException } from "../../exceptions/not-found.exception";

@Injectable()
export class GetUserByIdService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("User not found", id);
    }

    return user;
  }
}
