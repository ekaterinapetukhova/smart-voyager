import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "./config/config";
import { ZodErrorExceptionFilter } from "./api/zod-error.exception-filter";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(config.globalPrefix);
  app.useGlobalFilters(app.get(ZodErrorExceptionFilter));
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
