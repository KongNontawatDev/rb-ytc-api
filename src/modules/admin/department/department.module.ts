import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { AccessControlModule } from '@modules/admin/access-control/access-control.module';
import { AuthModule } from '@modules/admin/auth/auth.module';
import { DepartmentService } from '@modules/core/department/department.service';

@Module({
  imports:[AuthModule,AccessControlModule],
  controllers: [DepartmentController,],
  providers: [DepartmentService],
})
export class DepartmentModule {}
