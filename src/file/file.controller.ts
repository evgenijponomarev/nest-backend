import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /\/(png|jpg|jpeg|pdf|webp)$/,
          }),
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5,
            message: 'File size is too large',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.uploadFile(file);
  }
}
