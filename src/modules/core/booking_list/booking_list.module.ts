import { Module } from '@nestjs/common';
import { BookingListService } from '@modules/core/booking_list/booking_list.service';
import { DateModule } from '@common/utils/date/date.module';
import { LineMessagingModule } from '@provider/line-messaging-api/line-messaging.module';

@Module({
  imports:[DateModule,LineMessagingModule],
  providers: [BookingListService],
})
export class BookingListCoreModule {}
