import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { ChatController } from "./chat.controller";
import { CreateChatMessageService } from "./service/create-chat-message.service";
import { CreateChatService } from "./service/create-chat.service";
import { GetChatService } from "./service/get-chat.service";
import { GetAllChatsService } from "./service/get-all-chats.service";

@Module({
  imports: [PrismaModule],
  controllers: [ChatController],
  providers: [CreateChatService, CreateChatMessageService, GetChatService, GetAllChatsService],
})
export class ChatModule {}
