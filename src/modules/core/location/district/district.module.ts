import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { AccessControlModule } from '@modules/admin/access-control/access-control.module';
import { AuthModule } from '@modules/admin/auth/auth.module';

@Module({
  imports:[AuthModule,AccessControlModule],
  controllers: [DistrictController,],
  providers: [DistrictService],
})
export class DistrictModule {}
