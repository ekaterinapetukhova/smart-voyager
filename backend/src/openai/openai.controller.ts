import { Body, Controller, Get, Post } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "../auth/user.decorator";
import { ServerError } from "../error/server.error";
import { OpenAIService } from "./openai.service";
import { validAiContentMessageSchema } from "./dto/suggest-trip-content.dto";

@Controller("ai")
export class OpenaiController {
  public constructor(private readonly openaiService: OpenAIService) {}

  @Post("suggest-trip")
  public async suggestTrip(@GetUser() user: User, @Body() body: unknown): Promise<{ routeId: string } | undefined> {
    const validAiContentMessage = validAiContentMessageSchema.parse(body);

    const routeId = await this.openaiService.execute(validAiContentMessage, user.id);

    if (!routeId) {
      throw new ServerError("Route creation failed");
    }

    return {
      routeId,
    };
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
