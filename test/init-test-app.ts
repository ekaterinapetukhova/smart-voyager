import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { config } from "../src/config/config";
import { ZodErrorExceptionFilter } from "../src/api/zod-error.exception-filter";

export const initTestApp = async (): Promise<INestApplication> => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();

  app.setGlobalPrefix(config.globalPrefix);
  app.useGlobalFilters(app.get(ZodErrorExceptionFilter));
  app.enableCors();

  return await app.init();
};
