import path from "node:path";
import fs from "fs/promises";
import { Injectable } from "@nestjs/common";
import { config } from "../../config/config";
import { NotFoundError } from "../../error/not-found.error";

@Injectable()
export class GetFileService {
  public async execute(id: string): Promise<string> {
    const fileName = path.join(config.uploadsPath, `upload_${id}.jpg`);

    try {
      return await fs.readFile(fileName, { encoding: "base64" });
    } catch (err) {
      console.error(err);

      throw new NotFoundError("File with such id not found", id);
    }
  }
}
