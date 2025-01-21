import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { AccessControlModule } from '@modules/admin/access-control/access-control.module';
import { AuthModule } from '@modules/admin/auth/auth.module';

@Module({
  imports:[AuthModule,AccessControlModule],
  controllers: [ProvinceController,],
  providers: [ProvinceService],
})
export class ProvinceModule {}
