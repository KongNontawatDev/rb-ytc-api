import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UploadedFiles,
  UseFilters,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/common/utils/file/file.service';
import { fileUploadOptions } from '@common/utils/file/file.config';
import { JwtAuthGuard } from '@provider/jwt/guards/jwt-auth.guard';
import { RoomService } from '@modules/core/room/room.service';
import { CreateRoomDto } from '@modules/core/room/dto/create-room.dto';
import { UpdateRoomDto, UpdateStatusRoomDto } from '@modules/core/room/dto/update-room.dto';
import {
  DeleteManyRoomDto,
  FindOneRoomParamDto,
  FindRoomsByConditionQueryDto,
  UpdateManyRoomDto,
} from '@modules/core/room/dto/params-room.dto';
import { ValidationUploadExceptionFilter } from '@common/exceptions/uploadsFilter';

@Controller({
  path: 'admin/room',
  version: ['1'],
})
@UseGuards(JwtAuthGuard)
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseFilters(ValidationUploadExceptionFilter)
  @UseInterceptors(
    FilesInterceptor(
      'images[]',
      10,
      fileUploadOptions({
        destination: './public/room',
        maxFileSize: 5_000_000,
        mimeTypes: [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/svg+xml',
          'image/jpg',
        ],
      }),
    ),
  )
  async create(
    @Body() body: CreateRoomDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = await this.roomService.create(body, files);
      return {
        message: 'เพิ่มข้อมูลห้องและรูปภาพ',
        error: 0,
        data,
      };
    } catch (error) {
      if (files?.length) {
        await Promise.all(
          files.map((file) => this.fileService.deleteFiles(file.path)),
        );
      }
      throw error;
    }
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor(
      'images[]',
      10,
      fileUploadOptions({
        destination: './public/room',
        maxFileSize: 5_000_000,
        mimeTypes: [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/svg+xml',
          'image/jpg',
        ],
      }),
    ),
  )
  async update(
    @Param('id') id: string,
    @Body() body: UpdateRoomDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const data = await this.roomService.update(+id, body, files);
    return {
      message: 'แก้ไขข้อมูลห้องและรูปภาพ',
      error: 0,
      data,
    };
  }

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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.roomService.remove(+id);

    return {
      message: 'ลบข้อมูลห้องตามรหัส',
      error: 0,
      data,
    };
  }

  @Post('delete-many')
  async removeMany(@Body() body: DeleteManyRoomDto) {
    const data = await this.roomService.removeMany(body.id);

    return {
      message: 'ลบข้อมูลห้องหลายแถว',
      error: 0,
      data,
    };
  }

  @Post('update-status-many')
  async updateStatusMany(@Body() body: UpdateManyRoomDto) {
    const data = await this.roomService.updateStatusMany(body.id, body.status);

    return {
      message: 'เปลี่ยนสถานะห้องหลายแถว',
      error: 0,
      data,
    };
  }

    @Patch('update/status/:id')
  async updateStatusOne(@Param('id') id: string, @Body() body: UpdateStatusRoomDto) {
    const data = await this.roomService.updateStatusOne(+id, body);

    return {
      message: 'แก้ไขสถานะแผนก/ฝ่ายงานตามรหัส',
      error: 0,
      data,
    };
  }
}
