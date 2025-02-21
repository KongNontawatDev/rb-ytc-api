import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { FileModule } from 'src/common/utils/file/file.module';
import { CompressionModule } from 'src/common/utils/compression/compression.module';
import { AccessControlModule } from '../access-control/access-control.module';
import { RoomService } from '@modules/core/room/room.service';
import { DateModule } from '@common/utils/date/date.module';

@Module({
  imports: [FileModule,CompressionModule,AccessControlModule,DateModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
