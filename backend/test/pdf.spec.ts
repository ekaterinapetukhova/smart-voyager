import fs from "fs/promises";
import { INestApplication } from "@nestjs/common";
import { GeneratePdfService } from "../src/pdf/service/generate-pdf.service";
import { initTestApp } from "./init-test-app";

describe("pdf", () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await initTestApp();
  });

  it(
    "makes a pdf",
    async () => {
      const service = app.get(GeneratePdfService);

      const result = await service.execute("<b>yo</b>");
      await fs.writeFile("test.pdf", result);
    },
    1200 * 1000
  );
});
