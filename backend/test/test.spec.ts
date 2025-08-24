import path from "node:path";
import fs from "fs/promises";
import { INestApplication } from "@nestjs/common";
import { SaveFilesService } from "../src/files/service/save-file.service";
import { initTestApp } from "./init-test-app";

describe("files", () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await initTestApp();
  });

  it("test", async () => {
    const fileService = app.get(SaveFilesService);

    const imgPath = path.join(__dirname, "test.jpg");

    const buffer = await fs.readFile(imgPath);

    await fileService.execute("1", buffer);
  });
});
