import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule as AdminAdminModule } from './admin/admin.module';
import { AccessoryModule } from './accessory/accessory.module';
import { DepartmentModule } from './department/department.module';
import { RoomModule } from './room/room.module';
import { BookingListModule } from './booking_list/booking_list.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports:[UserModule,AdminAdminModule,AccessoryModule,DepartmentModule, RoomModule, BookingListModule, DashboardModule]
})
export class AdminModule {}
