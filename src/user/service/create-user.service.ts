import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { hashPassword } from "../../utils/hash-password";

@Injectable()
export class CreateUserService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(data: CreateUserDto): Promise<User> {
    const hash = await hashPassword(data.password);

    return this.prisma.user.create({
      data: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        passwordHash: hash,
      },
    });
  }
}
