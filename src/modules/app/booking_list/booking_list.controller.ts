import { BookingListService } from '@modules/core/booking_list/booking_list.service';
import { CreateBookingListDto } from '@modules/core/booking_list/dto/create-booking_list.dto';
import {
  findManyBookingListByUserDto,
  FindOneBookingListParamDto,
  FindRoomBookingDateParamDto,
} from '@modules/core/booking_list/dto/params-booking_list.dto';
import {
  UpdateBookingListDto,
  UpdateStatusBookingListDto,
} from '@modules/core/booking_list/dto/update-booking_list.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LineMessagingService } from '@provider/line-messaging-api/line-messaging.service';
import { bookingTemplate } from '@provider/line-messaging-api/templates/booking-template';

@Controller({
  path: 'app/booking_list',
  version: '1',
})
export class BookingListController {
  constructor(
    private readonly bookingListService: BookingListService,
    private readonly lineMessageingService: LineMessagingService,
  ) {}

  @Get()
  async findAll() {
    const booking_list = await this.bookingListService.findAll();
    return {
      message: 'เรียกดูข้อมูลรายการจองทั้งหมด',
      error: 0,
      data: booking_list,
    };
  }

  @Get('by/month')
  async findAllCurrentMonth() {
    const booking_list = await this.bookingListService.findAllCurrentMonth();
    return {
      message: 'เรียกดูข้อมูลรายการจองทั้งหมด',
      error: 0,
      data: booking_list,
    };
  }

  @Get('by/user/:user_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAllByUser(@Param() params: findManyBookingListByUserDto) {
    const booking_list = await this.bookingListService.findManyByUser(
      +params.user_id,
    );
    return {
      message: 'เรียกดูข้อมูลรายการจองทั้งหมด',
      error: 0,
      data: booking_list,
    };
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param() params: FindOneBookingListParamDto) {
    const data = await this.bookingListService.findOne(+params.id);
    return {
      message: 'เรียกดูข้อมูลรายการจองตามรหัส',
      error: 0,
      data,
    };
  }

  @Get('room/booking_date/:room_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findRoomBookedDates(@Param() params: FindRoomBookingDateParamDto) {
    const data = await this.bookingListService.findRoomBookedDates(
      +params.room_id,
    );
    return {
      message: 'เรียกดูข้อมูลวันที่จองตามรหัสห้อง',
      error: 0,
      data,
    };
  }

  @Post()
  async create(@Body() body: CreateBookingListDto) {
    const data = await this.bookingListService.create(body);
    if (data) {
      await this.lineMessageingService.pushMessage(
        data.user.line_id,
        bookingTemplate('จองห้องประชุมแล้ว', data, '#34A853'),
      );
    }
    return {
      message: 'เพิ่มข้อมูลรายการจอง',
      error: 0,
      data,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateBookingListDto) {
    const data = await this.bookingListService.update(+id, body);

    return {
      message: 'แก้ไขข้อมูลรายการจองตามรหัส',
      error: 0,
      data,
    };
  }

  @Patch('update/status/:id')
  async updateStatusOne(
    @Param('id') id: string,
    @Body() body: UpdateStatusBookingListDto,
  ) {
    const data = await this.bookingListService.updateStatusOne(+id, body);
    if (data) {
      await this.lineMessageingService.pushMessage(
        data.user.line_id,
        bookingTemplate('ยกเลิกจองห้องประชุมแล้ว', data, '#EA4335'),
      );
    }
    return {
      message: 'แก้ไขสถานะรายการจองตามรหัส',
      error: 0,
      data,
    };
  }
}
