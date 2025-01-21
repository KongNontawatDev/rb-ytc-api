import { FileService } from '@common/utils/file/file.service';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationUploadExceptionFilter implements ExceptionFilter {
  constructor(private readonly fileService: FileService) {}

  async catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    // ตรวจสอบไฟล์ที่อัปโหลด
    const files = request.files; // กรณี multiple files
    const file = request.file;   // กรณี single file

    try {
      // กรณี multiple files
      if (files) {
        for (const file of files) {
          await this.fileService.deleteFiles(file.path);
        }
      }
      // กรณี single file
      else if (file) {
        await this.fileService.deleteFiles(file.path);
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบไฟล์:', error);
    }

    // ส่ง response กลับไป
    response.status(400).json(exception.getResponse());
  }
}