import { Module } from '@nestjs/common';
import { S3FileUploadService } from './s3.service';

@Module({
  providers: [S3FileUploadService],
  exports: [S3FileUploadService],
})
export class S3FileUploadModule {}