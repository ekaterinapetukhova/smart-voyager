import { Module } from "@nestjs/common";
import { OpenaiController } from "./openai.controller";
import { OpenAIService } from "./openai.service";

@Module({
  controllers: [OpenaiController],
  providers: [OpenAIService],
})
export class AIModule {}
