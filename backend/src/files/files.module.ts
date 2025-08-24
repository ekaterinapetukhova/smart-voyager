import { Module } from "@nestjs/common";
import { SaveFilesService } from "./service/save-file.service";
import { GetFileService } from "./service/get-file.service";

@Module({
  controllers: [],
  providers: [SaveFilesService, GetFileService],
  imports: [],
  exports: [SaveFilesService, GetFileService],
})
export class FilesModule {}
