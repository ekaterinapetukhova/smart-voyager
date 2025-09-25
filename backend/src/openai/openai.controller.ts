import { Controller, Get, Post } from "@nestjs/common";
import { OpenAIService } from "./openai.service";

@Controller("ai")
export class OpenaiController {
  public constructor(private readonly openaiService: OpenAIService) {}

  // @Post("suggest-trip")
  // public suggestTrip(@Body() body: unknown): Promise<> {}

  @Get()
  public get(): Promise<string | undefined> {
    return this.openaiService.doSmth();
  }

  @Post()
  public post(): void {
    //
  }
}
