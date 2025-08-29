import { Injectable } from "@nestjs/common";
import { Chat } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GetAllChatsService {
  public constructor(private readonly prisma: PrismaService) {}

  public execute(userId: string): Promise<Chat[]> {
    return this.prisma.chat.findMany({
      where: {
        members: {
          some: { id: userId },
        },
      },
      include: {
        members: true,
        ChatMessage: true,
      },
    });
  }
}
