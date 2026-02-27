import { Injectable } from "@nestjs/common";
import { Chat } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GetChatByMembersService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(senderId: string, receiverId: string): Promise<Chat | null> {
    const chat = await this.prisma.chat.findFirst({
      where: {
        members: {
          every: {
            id: {
              in: [senderId, receiverId],
            },
          },
        },
      },
      include: {
        members: true,
        chatMessage: true,
      },
    });

    if (!chat) {
      return null;
    }

    return chat;
  }
}
