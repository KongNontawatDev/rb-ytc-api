import { Module } from '@nestjs/common';
import { AmphureService } from './amphure.service';
import { AmphureController } from './amphure.controller';
import { AccessControlModule } from '@modules/admin/access-control/access-control.module';
import { AuthModule } from '@modules/admin/auth/auth.module';

@Module({
  imports:[AuthModule,AccessControlModule],
  controllers: [AmphureController,],
  providers: [AmphureService],
})
export class AmphureModule {}
