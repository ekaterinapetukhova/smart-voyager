import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { Chat, ChatMessage, User } from "@prisma/client";
import { GetUser } from "../auth/user.decorator";
import { createChatMessageDtoSchema } from "./dto/create-chat-message.dto";
import { CreateChatService } from "./service/create-chat.service";
import { GetChatByIdService } from "./service/get-chat-by-id.service";
import { GetAllChatsService } from "./service/get-all-chats.service";
import { CreateChatMessageService } from "./service/create-chat-message.service";
import { GetChatByMembersService } from "./service/get-chat-by-members.service";

@Controller("chat")
export class ChatController {
  public constructor(
    private readonly createChatService: CreateChatService,
    private readonly getChatByIdService: GetChatByIdService,
    private readonly getAllChatsService: GetAllChatsService,
    private readonly createChatMessageService: CreateChatMessageService,
    private readonly getChatByMembersService: GetChatByMembersService
  ) {}

  @Post()
  public async create(@GetUser() user: User, @Body() data: unknown): Promise<Chat> {
    const createChatMessageDto = createChatMessageDtoSchema.parse(data);

    return this.createChatService.execute(user.id, createChatMessageDto.recipientId, createChatMessageDto.content);
  }

  @Get(":id")
  public async getById(@Param("id", ParseUUIDPipe) id: string): Promise<Chat | null> {
    return this.getChatByIdService.execute(id);
  }

  @Get(":receiverId")
  public async getByMembers(
    @Param("receiverId", ParseUUIDPipe) receiverId: string,
    @GetUser() sender: User
  ): Promise<Chat | null> {
    console.log("senderId:", sender.id, "receiverId:", receiverId);

    return this.getChatByMembersService.execute(sender.id, receiverId);
  }

  @Get()
  public async getAll(@GetUser() user: User): Promise<Chat[]> {
    return this.getAllChatsService.execute(user.id);
  }

  @Post(":id/message")
  public async createMessage(
    @Param("id", ParseUUIDPipe) chatId: string,
    @GetUser() user: User,
    @Body() data: unknown
  ): Promise<ChatMessage> {
    const createChatMessageDto = createChatMessageDtoSchema.parse(data);

    return this.createChatMessageService.execute(
      user.id,
      createChatMessageDto.recipientId,
      chatId,
      createChatMessageDto.content
    );
  }
}
