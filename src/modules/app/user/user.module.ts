import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { FileModule } from 'src/common/utils/file/file.module';
import { CompressionModule } from 'src/common/utils/compression/compression.module';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '@modules/core/user/user.service';

@Module({
  imports: [FileModule,CompressionModule,AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
