import { Module } from '@nestjs/common';
import { FileService } from './file.service';

@Module({
  providers: [FileService],
  exports: [FileService], // Export เพื่อให้ Module อื่นๆ เรียกใช้งานได้
})
export class FileModule {}
