import { Module } from '@nestjs/common';
import { AccessoryController } from './accessory.controller';
import { FileModule } from 'src/common/utils/file/file.module';
import { CompressionModule } from 'src/common/utils/compression/compression.module';
import { AuthModule } from '../auth/auth.module';
import { AccessControlModule } from '../access-control/access-control.module';
import { AccessoryService } from '@modules/core/accessory/accessory.service';

@Module({
  imports: [FileModule,CompressionModule,AuthModule,AccessControlModule],
  controllers: [AccessoryController],
  providers: [AccessoryService],
})
export class AccessoryModule {}
