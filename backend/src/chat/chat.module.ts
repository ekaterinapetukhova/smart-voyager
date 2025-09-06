import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { FilesModule } from "../files/files.module";
import { ChatController } from "./chat.controller";
import { CreateChatMessageService } from "./service/create-chat-message.service";
import { CreateChatService } from "./service/create-chat.service";
import { GetChatByIdService } from "./service/get-chat-by-id.service";
import { GetAllChatsService } from "./service/get-all-chats.service";
import { GetChatByMembersService } from "./service/get-chat-by-members.service";

@Module({
  imports: [PrismaModule, FilesModule],
  controllers: [ChatController],
  providers: [
    CreateChatService,
    CreateChatMessageService,
    GetChatByIdService,
    GetAllChatsService,
    GetChatByMembersService,
  ],
  exports: [GetChatByMembersService],
})
export class ChatModule {}
