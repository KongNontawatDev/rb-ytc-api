import { Injectable } from '@nestjs/common';
import { PrismaService } from '@provider/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly db: PrismaService) {}

  async checkRegister(line_id: string) {
    // เช็คว่า line_id นี้มีในระบบหรือยัง
    const user = await this.db.user.findUnique({
      where: { line_id: line_id },
    });

    if (user) {
      // ถ้ามีในระบบแล้ว ก็ให้อนุญาตเข้าสู่ระบบ
      return user;
    } else {
      // ถ้าไม่มี ให้ส่งข้อความเพื่อให้สมัครก่อน
      return null;
    }
  }


}
