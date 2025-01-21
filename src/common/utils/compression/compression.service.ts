import { Injectable, Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
const sharp = require('sharp');

@Injectable()
export class CompressionService {
  private readonly logger = new Logger(CompressionService.name);

  /**
   * บีบอัดไฟล์รูปภาพโดยไม่เปลี่ยนขนาดและเขียนทับไฟล์เดิม
   * @param filePath - Path ของไฟล์รูปต้นฉบับ
   * @returns Promise<string> - Path ของไฟล์ที่บีบอัดแล้ว
   */
  async compressImage(filePath: string): Promise<string> {
    const tempFilePath = `${filePath}.temp`;

    try {
      // ใช้ sharp ตรวจสอบประเภทของไฟล์
      const metadata = await sharp(filePath).metadata();

      const sharpInstance = sharp(filePath);

      // จัดการประเภทไฟล์ต่าง ๆ
      if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
        // สำหรับ JPEG
        await sharpInstance
          .jpeg({ quality: 80 }) // ตัวอย่าง: บีบอัด JPEG โดยลดคุณภาพเป็น 80%
          .toFile(tempFilePath);
      } else if (metadata.format === 'png') {
        // สำหรับ PNG (รักษาความโปร่งใส)
        await sharpInstance
          .png({ compressionLevel: 9 }) // ตัวอย่าง: บีบอัด PNG ด้วย compressionLevel 9
          .toFile(tempFilePath);
      } else {
        // สำหรับไฟล์รูปอื่น ๆ
        await sharpInstance.toFile(tempFilePath);
      }

      // ย้ายไฟล์จาก tempFilePath กลับไปที่ filePath
      await fs.rename(tempFilePath, filePath);

      this.logger.log(`Compressed file: ${filePath}`);
      return filePath;
    } catch (error) {
      this.logger.error(`Failed to compress file: ${filePath}`, error);

      // ลบ tempFilePath หากเกิดข้อผิดพลาด
      await fs.unlink(tempFilePath).catch(() => {});
      throw error;
    }
  }

  /**
   * บีบอัดไฟล์รูปภาพแบบหลายรูปและเขียนทับไฟล์เดิม
   * @param files - ไฟล์รูปภาพในรูปแบบต่างๆ
   * @returns Promise<Record<string, string[]>> - รายการ Path ของไฟล์ที่บีบอัดแล้ว
   */
  async compressFiles(
    files: Express.Multer.File | Express.Multer.File[] | Record<string, Express.Multer.File[]>,
  ): Promise<Record<string, string[]>> {
    const compressedFiles: Record<string, string[]> = {};

    const compress = async (file: Express.Multer.File): Promise<string> => {
      return await this.compressImage(file.path);
    };

    // ตรวจสอบและจัดการแต่ละกรณี
    if (Array.isArray(files)) {
      compressedFiles['default'] = await Promise.all(files.map(compress));
    } else if ((files as Express.Multer.File).fieldname) {
      compressedFiles['default'] = [await compress(files as Express.Multer.File)];
    } else {
      for (const field in files) {
        compressedFiles[field] = await Promise.all(files[field].map(compress));
      }
    }

    return compressedFiles;
  }
}
