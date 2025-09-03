import { Injectable } from "@nestjs/common";
import { Chat } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GetChatService {
  public constructor(private readonly prisma: PrismaService) {}

  public execute(id: string): Promise<Chat | null> {
    return this.prisma.chat.findFirst({
      where: {
        id,
      },
      include: {
        members: true,
        chatMessage: true,
      },
    });
  }
}
