import { Injectable } from "@nestjs/common";
import { Chat } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateChatMessageService } from "./create-chat-message.service";

@Injectable()
export class CreateChatService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly createChatMessageService: CreateChatMessageService
  ) {}

  public async execute(userId: string, recipientId: string, content: string): Promise<Chat> {
    const chat = await this.prisma.chat.create({
      data: {
        members: {
          connect: [userId, recipientId].map((id) => ({
            id,
          })),
        },
      },
    });

    await this.createChatMessageService.execute(userId, recipientId, chat.id, content);

    return chat;
  }
}
