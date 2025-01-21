import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { AccessControlModule } from '@modules/admin/access-control/access-control.module';
import { AuthModule } from '@modules/admin/auth/auth.module';

@Module({
  imports:[AuthModule,AccessControlModule],
  providers: [DepartmentService],
})
export class DepartmentModule {}
