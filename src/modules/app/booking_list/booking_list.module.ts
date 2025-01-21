import { Module } from '@nestjs/common';
import { BookingListController } from './booking_list.controller';
import { BookingListService } from '@modules/core/booking_list/booking_list.service';
import { BookingListCoreModule } from '@modules/core/booking_list/booking_list.module';
import { DateModule } from '@common/utils/date/date.module';
import { LineMessagingModule } from '@provider/line-messaging-api/line-messaging.module';

@Module({
  imports:[BookingListCoreModule,DateModule,LineMessagingModule],
  controllers: [BookingListController],
  providers: [BookingListService],
})
export class BookingListModule {}
