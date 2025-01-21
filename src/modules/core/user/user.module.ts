import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { FileModule } from 'src/common/utils/file/file.module';
import { CompressionModule } from 'src/common/utils/compression/compression.module';

@Module({
  imports: [FileModule,CompressionModule],
  providers: [UserService],
})
export class UserModule {}
