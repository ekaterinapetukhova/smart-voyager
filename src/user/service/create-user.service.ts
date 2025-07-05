import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { ConflictException } from "../../exceptions/conflict.exception";
import { hashPassword } from "../../utils/hash-password";
import { GetUserByEmailService } from "./get-user-by-email.service";

@Injectable()
export class CreateUserService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly getUserByEmailService: GetUserByEmailService
  ) {}

  public async execute(data: CreateUserDto): Promise<User> {
    const existingUser = await this.getUserByEmailService.execute(data.email);

    if (existingUser) {
      throw new ConflictException("User with such email is already exists");
    }

    const hash = await hashPassword(data.password);

    return this.prisma.user.create({
      data: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: hash,
      },
    });
  }
}
