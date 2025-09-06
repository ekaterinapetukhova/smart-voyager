import { Injectable } from "@nestjs/common";
import { Chat } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GetChatByMembersService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(senderId: string, receiverId: string): Promise<Chat | null> {
    const chat = await this.prisma.chat.findFirst({
      where: {
        AND: [{ members: { some: { id: senderId } } }, { members: { some: { id: receiverId } } }],
      },
      include: {
        members: true,
        chatMessage: true,
      },
    });

    if (!chat) {
      return null;
    }

    console.log(JSON.stringify(chat, null, 2));

    return chat;
  }
}
