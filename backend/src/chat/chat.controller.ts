import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { Chat, ChatMessage, User } from "@prisma/client";
import { GetUser } from "../auth/user.decorator";
import { createChatMessageDtoSchema } from "./dto/create-chat-message.dto";
import { CreateChatService } from "./service/create-chat.service";
import { GetChatService } from "./service/get-chat.service";
import { GetAllChatsService } from "./service/get-all-chats.service";
import { CreateChatMessageService } from "./service/create-chat-message.service";

@Controller("chat")
export class ChatController {
  public constructor(
    private readonly createChatService: CreateChatService,
    private readonly getChatService: GetChatService,
    private readonly getAllChatsService: GetAllChatsService,
    private readonly createChatMessageService: CreateChatMessageService
  ) {}

  @Post()
  public async create(@GetUser() user: User, @Body() data: unknown): Promise<Chat> {
    console.log(data);
    const createChatMessageDto = createChatMessageDtoSchema.parse(data);
    console.log(createChatMessageDto);
    return this.createChatService.execute(user.id, createChatMessageDto.recipientId, createChatMessageDto.content);
  }

  @Get(":id")
  public async getOne(@Param("id", ParseUUIDPipe) id: string): Promise<Chat | null> {
    return this.getChatService.execute(id);
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
