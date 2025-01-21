import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { DepartmentModule } from './department/department.module';
import { BookingListModule } from './booking_list/booking_list.module';

@Module({
  imports:[AuthModule, UserModule, RoomModule, DepartmentModule, BookingListModule]
})
export class AppModule {}
