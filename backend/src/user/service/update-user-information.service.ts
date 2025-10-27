import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { NotFoundError } from ".././../error/not-found.error";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdateUserDto } from "../dto/update-user.dto";
import { SaveFilesService } from "../../files/service/save-file.service";
import { hashPassword } from "../../utils/hash-password";

@Injectable()
export class UpdateUserInformationService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly saveFilesService: SaveFilesService
  ) {}

  public async execute(id: string, data: UpdateUserDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    const { password, avatar, email, ...restData } = data;

    if (avatar) {
      await this.saveFilesService.execute(id, Buffer.from(avatar, "base64"));
    }

    const updatedData: Partial<User> = {
      ...restData,
      email: email && email !== existingUser.email ? email : existingUser.email,
      passwordHash: password ? await hashPassword(password) : existingUser.passwordHash,
    };

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updatedData,
      },
    });
  }
}
