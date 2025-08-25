import { Controller, Post } from "@nestjs/common";

@Controller("chat")
export class ChatController {
  public constructor() {}

  @Post("message")
}
