import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "./config/config";
import { ZodValidationErrorFilter } from "./exceptions/zod-validation.exception";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(config.globalPrefix);
  app.useGlobalFilters(app.get(ZodValidationErrorFilter));
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
