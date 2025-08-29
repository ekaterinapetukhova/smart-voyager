import { Injectable } from "@nestjs/common";
import { ChatMessage } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class CreateChatMessageService {
  public constructor(private readonly prisma: PrismaService) {}

  public execute(senderId: string, recipientId: string, chatId: string, content: string): Promise<ChatMessage> {
    return this.prisma.chatMessage.create({
      data: {
        senderId,
        recipientId,
        content,
        chatId,
      },
      include: {
        sender: true,
        recipient: true,
        chat: true,
      },
    });
  }
}
