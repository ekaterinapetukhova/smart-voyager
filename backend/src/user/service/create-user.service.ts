import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { hashPassword } from "../../utils/hash-password";
import { SaveFilesService } from "../../files/service/save-file.service";

@Injectable()
export class CreateUserService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly saveFilesService: SaveFilesService
  ) {}

  public async execute(data: CreateUserDto): Promise<User> {
    const hash = await hashPassword(data.password);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        gender: data.gender,
        birthDate: new Date(data.birthDate),
        passwordHash: hash,
        avatar: data.avatar,
      },
    });

    await this.saveFilesService.execute(user.id, Buffer.from(data.avatar, "base64"));

    return user;
  }
}
