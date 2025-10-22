import { Module } from "@nestjs/common";
import { GeoapifyModule } from "../geoapify/geoapify.module";
import { TripModule } from "../trip/trip.module";
import { UserModule } from "../user/user.module";
import { OpenaiController } from "./openai.controller";
import { OpenAIService } from "./openai.service";

@Module({
  controllers: [OpenaiController],
  providers: [OpenAIService],
  imports: [GeoapifyModule, TripModule, UserModule],
})
export class AIModule {}
