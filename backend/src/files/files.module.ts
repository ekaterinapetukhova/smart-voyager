import { Module } from "@nestjs/common";
import { SaveFilesService } from "./service/save-file.service";

@Module({
  controllers: [],
  providers: [SaveFilesService],
  imports: [],
})
export class FilesModule {}
