import { BookingListService } from '@modules/core/booking_list/booking_list.service';
import { CreateBookingListDto } from '@modules/core/booking_list/dto/create-booking_list.dto';
import {
  DeleteManyBookingListDto,
  FindBookingListsByConditionQueryDto,
  findManyBookingListByRoomForCalendarAndTimelineParamDto,
  findManyBookingListByUserForCalendarAndTimelineParamDto,
  FindOneBookingListParamDto,
  UpdateManyBookingListDto,
} from '@modules/core/booking_list/dto/params-booking_list.dto';
import {
  UpdateBookingListDto,
  UpdateStatusBookingListDto,
} from '@modules/core/booking_list/dto/update-booking_list.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';

@Controller({
  path: 'admin/booking_list',
  version: '1',
})
export class BookingListController {
  constructor(private readonly bookingListService: BookingListService) {}

  @Post()
  async create(@Body() body: CreateBookingListDto) {
    const data = await this.bookingListService.create(body);
    return {
      message: 'เพิ่มข้อมูลรายการจอง',
      error: 0,
      data,
    };
  }

  @Get('/search')
  async findByCondition(@Query() query: FindBookingListsByConditionQueryDto) {
    const hasQueryParams =
      query.textSearch ||
      query.searchField ||
      query.page ||
      query.pageSize ||
      query.sortField ||
      query.sortOrder;

    let result:
      | { data: any[] | undefined; pageCount?: number; total?: number,statusCounts?:any }
      | undefined;

    if (hasQueryParams) {
      result = await this.bookingListService.findByCondition(query);
    } else {
      const booking_lists = await this.bookingListService.findAll();
      result = { data: booking_lists };
    }

    if (result) {
      return {
        message: 'เรียกดูข้อมูลรายการจองทั้งหมด',
        ...(hasQueryParams && {
          meta: {
            page: Number(query.page) || 1,
            pageSize: Number(query.pageSize) || 10,
            pageCount: result.pageCount,
            total: result.total,
            statusCounts: result.statusCounts,
          },
        }),
        error: 0,
        data: result.data,
      };
    }
  }

  @Get()
  async findAll() {
    const booking_list = await this.bookingListService.findAll();
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

  @Get('list/count')
  async findCount() {
    const data = await this.bookingListService.findCount();
    return {
      message: 'เรียกดูข้อมูลจำนวนรายการจอง',
      error: 0,
      data,
    };
  }

  @Get('room/calendar-and-timeline/:room_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findManyByRoomForCalendarAndTimeline(
    @Param() params: findManyBookingListByRoomForCalendarAndTimelineParamDto,
  ) {
    const data =
      await this.bookingListService.findManyByRoomForCalendarAndTimeline(
        +params.room_id,
      );
    return {
      message: 'เรียกดูข้อมูลรายการจองตามรหัสห้อง',
      error: 0,
      data,
    };
  }

  @Get('user/calendar-and-timeline/:user_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findManyByUserForCalendarAndTimeline(
    @Param() params: findManyBookingListByUserForCalendarAndTimelineParamDto,
  ) {
    const data =
      await this.bookingListService.findManyByRoomForCalendarAndTimeline(
        +params.user_id,
      );
    return {
      message: 'เรียกดูข้อมูลรายการจองตามรหัสผู้ใช้',
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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.bookingListService.remove(+id);

    return {
      message: 'ลบข้อมูลรายการจองตามรหัส',
      error: 0,
      data,
    };
  }

  @Post('delete-many')
  async removeMany(@Body() body: DeleteManyBookingListDto) {
    const data = await this.bookingListService.removeMany(body.id);

    return {
      message: 'ลบข้อมูลรายการจองตามรหัสที่เลือก',
      error: 0,
      data,
    };
  }

  @Post('update-status-many')
  async updateStatusMany(@Body() body: UpdateManyBookingListDto) {
    const data = await this.bookingListService.updateStatusMany(
      body.id,
      body.status,
    );

    return {
      message: 'เปลี่ยนสถานะรายการจองหลายแถว',
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

    return {
      message: 'แก้ไขสถานะรายการจองตามรหัส',
      error: 0,
      data,
    };
  }
}
