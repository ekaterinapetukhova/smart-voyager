import fs from "fs/promises";
import path from "node:path";
import { Injectable } from "@nestjs/common";
import { config } from "../../config/config";

@Injectable()
export class SaveFilesService {
  public async execute(id: string, buffer: Buffer): Promise<void> {
    const fileName = path.join(config.uploadsPath, id);

    try {
      await fs.writeFile(fileName, buffer);
    } catch (err) {
      console.error(err);
    }
  }
}
