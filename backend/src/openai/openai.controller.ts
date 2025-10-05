import { Body, Controller, Get, Post } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "../auth/user.decorator";
import { OpenAIService } from "./openai.service";
import { validAiContentMessageSchema } from "./dto/suggest-trip-content.dto";

@Controller("ai")
export class OpenaiController {
  public constructor(private readonly openaiService: OpenAIService) {}

  @Post("suggest-trip")
  public suggestTrip(@GetUser() user: User, @Body() body: unknown): Promise<string | undefined> {
    const validAiContentMessage = validAiContentMessageSchema.parse(body);

    return this.openaiService.execute(validAiContentMessage, user.id);
  }

  @Get()
  public get(): Promise<string | undefined> {
    return this.openaiService.execute({ content: "make a trip in katowice with shops" }, "123456");
  }

  @Post()
  public post(): void {
    //
  }
}
