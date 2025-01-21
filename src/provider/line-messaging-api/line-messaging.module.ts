import { Module } from '@nestjs/common';
import { LineMessagingService } from './line-messaging.service';

@Module({
  providers: [LineMessagingService],
  exports: [LineMessagingService], // Export เพื่อให้โมดูลอื่นใช้งานได้
})
export class LineMessagingModule {}
