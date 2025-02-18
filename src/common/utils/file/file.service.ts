import {  Injectable, Logger } from '@nestjs/common';
import { unlink } from 'fs/promises';
import sharp from 'sharp';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);

  /**
   * ลบไฟล์ที่อัปโหลด โดยรองรับทั้ง single, array และ field array
   * @param files - ไฟล์ที่อัปโหลด สามารถเป็น string, string[], หรือ object ที่ประกอบด้วย field arrays
   */
  async deleteFiles(
    files: string | string[] | Record<string, string[]>,
  ): Promise<void> {
    const filePaths: string[] = [];

    // ตรวจสอบรูปแบบของไฟล์ที่รับเข้ามาและรวบรวม paths
    if (typeof files === 'string') {
      filePaths.push(files);
    } else if (Array.isArray(files)) {
      filePaths.push(...files);
    } else if (typeof files === 'object') {
      for (const key in files) {
        if (Array.isArray(files[key])) {
          filePaths.push(...files[key]);
        }
      }
    }

    // ลบไฟล์แต่ละไฟล์ในรายการ
    for (const path of filePaths) {
      try {
        await unlink(path);
        this.logger.log(`Successfully deleted file: ${path}`);
      } catch (error) {
        this.logger.error(`Error deleting file ${path}:`, error);
      }
    }
  }

  async checkTransparency(filePath: string): Promise<boolean> {
    const { channels } = await sharp(filePath).metadata();
    return channels === 4; // ช่อง 4 หมายถึงมีช่อง alpha สำหรับ transparency
  }

  async coverToTransparency(file:Express.Multer.File) {
    console.log('file path',file.path);
    
    await sharp(file.path)
    .toFormat('png') // แปลงเป็น PNG เพื่อความมั่นใจ
    .png({ quality: 100 }) // ตั้งค่าให้มีคุณภาพสูง
    .toFile(file.path);
  }
}
