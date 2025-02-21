import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { FileModule } from 'src/common/utils/file/file.module';
import { CompressionModule } from 'src/common/utils/compression/compression.module';
import { AccessControlModule } from '@modules/admin/access-control/access-control.module';
import { DateModule } from '@common/utils/date/date.module';

@Module({
  imports: [
    FileModule,
    CompressionModule,
    AccessControlModule,
    DateModule,
  ],
  providers: [RoomService],
  exports: [RoomService], // เพิ่ม exports ถ้าต้องการใช้ RoomService จาก module อื่น
})
export class RoomModule {}