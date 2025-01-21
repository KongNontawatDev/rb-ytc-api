import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { FileModule } from 'src/common/utils/file/file.module';
import { CompressionModule } from 'src/common/utils/compression/compression.module';
import { AccessControlModule } from '../access-control/access-control.module';
import { RoomService } from '@modules/core/room/room.service';

@Module({
  imports: [FileModule,CompressionModule,AccessControlModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
