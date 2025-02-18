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
  UploadedFile,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '@common/utils/file/file.service';
import { fileUploadOptions } from '@common/utils/file/file.config';
import { JwtAuthGuard } from '@provider/jwt/guards/jwt-auth.guard';
import { CreateAccessoryDto } from '@modules/core/accessory/dto/create-accessory.dto';
import { AccessoryService } from '@modules/core/accessory/accessory.service';
import { DeleteManyAccessoryDto, FindAccessorysByConditionQueryDto, FindOneAccessoryParamDto, UpdateManyAccessoryDto } from '@modules/core/accessory/dto/params-accessory.dto';
import { UpdateAccessoryDto, UpdateStatusAccessoryDto } from '@modules/core/accessory/dto/update-accessory.dto';

@Controller({
  path: 'admin/accessory',
  version: ['1'],
})
@UseGuards(JwtAuthGuard)
export class AccessoryController {
  constructor(
    private readonly accessoryService: AccessoryService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'image',
      fileUploadOptions({
        destination: './public/accessory',
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
    @Body() body: CreateAccessoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const data = await this.accessoryService.create(body, file);

      return {
        message: 'เพิ่มข้อมูลอุปกรณ์',
        error: 0,
        data,
      };
    } catch (error) {
      // เรียก FileService เพื่อลบไฟล์
      if (file) {
        await this.fileService.deleteFiles(file.path); // เรียก deleteFiles โดยส่ง path ของไฟล์
      }
      throw error;
    }
  }

  @Get('/search')
  async findByCondition(@Query() query: FindAccessorysByConditionQueryDto) {
    const result = await this.accessoryService.findByCondition(query);

    const meta = {
      page: Number(query.page),
      pageSize: Number(query.pageSize),
      pageCount: result.pageCount,
      total: result.total,
    };

    return {
      message: 'เรียกดูข้อมูลอุปกรณ์ทั้งหมด',
      ...(meta && { meta }),
      error: 0,
      data: result.data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.accessoryService.findAll();
    return {
      message: 'เรียกดูข้อมูลอุปกรณ์ทั้งหมด',
      error: 0,
      data,
    };
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param() params: FindOneAccessoryParamDto) {
    const data = await this.accessoryService.findOne(+params.id);
    return {
      message: 'เรียกดูข้อมูลอุปกรณ์ตามรหัส',
      error: 0,
      data,
    };
  }

  @Get('/list/dropdown')
  async findForDropdown() {
    const data = await this.accessoryService.findForDropdown();
    return {
      message: 'เรียกดูข้อมูลอุปกรณ์แสดงที่ dropdown',
      error: 0,
      data,
    };
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor(
      'image',
      fileUploadOptions({
        destination: './public/accessory',
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
    @Body() body: UpdateAccessoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = await this.accessoryService.update(+id, body, file);

    return {
      message: 'แก้ไขข้อมูลอุปกรณ์ตามรหัส',
      error: 0,
      data,
    };
  }

  @Patch('update/status/:id')
  async updateStatusOne(@Param('id') id: string, @Body() body: UpdateStatusAccessoryDto) {
    const data = await this.accessoryService.updateStatusOne(+id, body);

    return {
      message: 'แก้ไขสถานะแผนก/ฝ่ายงานตามรหัส',
      error: 0,
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.accessoryService.remove(+id);

    return {
      message: 'ลบข้อมูลอุปกรณ์ตามรหัส',
      error: 0,
      data,
    };
  }

  @Post('delete-many')
  async removeMany(@Body() body: DeleteManyAccessoryDto) {
    const data = await this.accessoryService.removeMany(body.id);

    return {
      message: 'ลบข้อมูลอุปกรณ์หลายแถว',
      error: 0,
      data,
    };
  }

  @Post('update-status-many')
  async updateStatusMany(@Body() body: UpdateManyAccessoryDto) {
    const data = await this.accessoryService.updateStatusMany(
      body.id,
      body.status,
    );

    return {
      message: 'เปลี่ยนสถานะอุปกรณ์หลายแถว',
      error: 0,
      data,
    };
  }
}
