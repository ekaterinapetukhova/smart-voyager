import fs from "fs/promises";
import path from "node:path";
import { Injectable } from "@nestjs/common";
import { config } from "../../config/config";
import { ServerError } from "../../error/server.error";

@Injectable()
export class SaveFilesService {
  public async execute(id: string, buffer: Buffer): Promise<void> {
    const fileName = path.join(config.uploadsPath, `upload_${id}.jpg`);

    try {
      await fs.writeFile(fileName, buffer);
    } catch {
      throw new ServerError("Failed to save file");
    }
  }
}
