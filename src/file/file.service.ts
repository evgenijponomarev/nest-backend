import { Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';

@Injectable()
export class FileService {
  uploadFile(file: Express.Multer.File) {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    const filePath = path.join(uploadDir, file.originalname);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(filePath, file.buffer);
    return { filePath };
  }
}
