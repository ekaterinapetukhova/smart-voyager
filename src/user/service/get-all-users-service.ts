import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GetAllUsersService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
