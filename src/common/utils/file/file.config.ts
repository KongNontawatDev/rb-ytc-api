import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface FileUploadOptions {
  destination: string;
  maxFileSize: number;
  mimeTypes: string | string[];
}

export const fileUploadOptions = ({
  destination,
  maxFileSize,
  mimeTypes,
}: FileUploadOptions) => {
  return {
    storage: diskStorage({
      destination,
      filename: (req, file, callback) => {
        try {
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix); // ใช้ callback แทนการ throw
        } catch (error) {
          // ส่งข้อผิดพลาดผ่าน callback
          callback(new BadRequestException('Error generating unique filename'), error);
        }
      },
    }),
    limits: {
      fileSize: maxFileSize,
    },
    fileFilter: (req, file, callback) => {
      try {
        const allowedMimeTypes = Array.isArray(mimeTypes) ? mimeTypes : [mimeTypes];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          const errorMessage = `ไม่รองรับไฟล์ประเภท: ${file.mimetype}. รองรับเฉพาะไฟล์: ${allowedMimeTypes.join(', ')}`;
          // ส่งข้อผิดพลาดผ่าน callback
          callback(new BadRequestException(errorMessage), false);
        } else {
          callback(null, true); // อนุญาตให้ไฟล์ผ่าน
        }
      } catch (error) {
        // ส่งข้อผิดพลาดที่เกิดขึ้นผ่าน callback
        callback(new BadRequestException('Error while checking file type'), false);
      }
    },
  };
};
