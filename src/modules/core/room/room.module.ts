import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { FileModule } from 'src/common/utils/file/file.module';
import { CompressionModule } from 'src/common/utils/compression/compression.module';
import { AccessControlModule } from '@modules/admin/access-control/access-control.module';

@Module({
  imports: [FileModule,CompressionModule,AccessControlModule],
  providers: [RoomService],
})
export class RoomModule {}
