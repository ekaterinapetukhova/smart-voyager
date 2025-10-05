import { Module } from "@nestjs/common";
import { GeoapifyModule } from "../geoapify/geoapify.module";
import { RouteModule } from "../route/route.module";
import { UserModule } from "../user/user.module";
import { OpenaiController } from "./openai.controller";
import { OpenAIService } from "./openai.service";

@Module({
  controllers: [OpenaiController],
  providers: [OpenAIService],
  imports: [GeoapifyModule, RouteModule, UserModule],
})
export class AIModule {}
