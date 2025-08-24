import { NestFactory } from "@nestjs/core";
import express from "express";
import { AppModule } from "./app.module";
import { config } from "./config/config";
import { ZodErrorExceptionFilter } from "./api/zod-error.exception-filter";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(config.globalPrefix);
  app.useGlobalFilters(app.get(ZodErrorExceptionFilter));
  app.enableCors();

  app.use(express.json({ limit: "50mb" }));

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
