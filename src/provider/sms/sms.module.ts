import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';

@Module({
  providers: [SmsService],
  exports: [SmsService], // Export เพื่อให้โมดูลอื่นใช้ได้
})
export class SmsModule {}
