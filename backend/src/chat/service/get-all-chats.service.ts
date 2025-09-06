import { Injectable } from "@nestjs/common";
import { Chat } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { GetFileService } from "../../files/service/get-file.service";

@Injectable()
export class GetAllChatsService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly getFileService: GetFileService
  ) {}

  public async execute(userId: string): Promise<Chat[] | []> {
    const chats = await this.prisma.chat.findMany({
      where: {
        members: {
          some: { id: userId },
        },
      },
      include: {
        members: true,
        chatMessage: true,
      },
    });

    for (const chat of chats) {
      for (const member of chat.members) {
        member.avatar = await this.getFileService.execute(member.id);
      }
    }

    return chats.sort(
      (a, b) =>
        b.chatMessage[b.chatMessage.length - 1].createdAt.getTime() -
        a.chatMessage[a.chatMessage.length - 1].createdAt.getTime()
    );
  }
}
