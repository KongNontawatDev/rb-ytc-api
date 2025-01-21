import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '@provider/jwt/guards/jwt-auth.guard';
import { RoomService } from '@modules/core/room/room.service';
import {
  FindOneRoomParamDto,
  FindRoomsByConditionQueryDto,
} from '@modules/core/room/dto/params-room.dto';

@Controller({
  path: 'app/room',
  version: ['1'],
})
// @UseGuards(JwtAuthGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/search')
  async findByCondition(@Query() query: FindRoomsByConditionQueryDto) {
    const result = await this.roomService.findByCondition(query);

    const meta = {
      page: Number(query.page),
      pageSize: Number(query.pageSize),
      pageCount: result.pageCount,
      total: result.total,
    };

    return {
      message: 'เรียกดูข้อมูลห้องทั้งหมด',
      ...(meta && { meta }),
      error: 0,
      data: result.data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.roomService.findAll();
    return {
      message: 'เรียกดูข้อมูลห้องทั้งหมด',
      error: 0,
      data,
    };
  }

  @Get('/status/empty')
  async findRoomEmpty() {
    const data = await this.roomService.findRoomEmpty();
    return {
      message: 'เรียกดูข้อมูลห้องทั้งหมด',
      error: 0,
      data,
    };
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param() params: FindOneRoomParamDto) {
    const data = await this.roomService.findOne(+params.id);
    return {
      message: 'เรียกดูข้อมูลห้องตามรหัส',
      error: 0,
      data,
    };
  }

  @Get('/list/dropdown')
  async findForDropdown() {
    const data = await this.roomService.findForDropdown();
    return {
      message: 'เรียกดูข้อมูลห้องแสดงที่ dropdown',
      error: 0,
      data,
    };
  }
}
