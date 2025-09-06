import { Injectable } from "@nestjs/common";
import { Chat } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { GetFileService } from "../../files/service/get-file.service";

@Injectable()
export class GetChatByIdService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly getFileService: GetFileService
  ) {}

  public async execute(id: string): Promise<Chat | null> {
    const chat = await this.prisma.chat.findFirst({
      where: {
        id,
      },
      include: {
        members: true,
        chatMessage: true,
      },
    });

    if (!chat) {
      return null;
    }

    for (const member of chat.members) {
      member.avatar = await this.getFileService.execute(member.id);
    }

    return chat;
  }
}
