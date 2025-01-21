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
import { AdminService } from './admin.service';
import { UpdateAdminDto, UpdateStatusAdminDto } from './dto/update-admin.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/common/utils/file/file.service';
import { CreateAdminDto } from '@modules/admin/admin/dto/create-admin.dto';
import {
  FindAdminsByConditionQueryDto,
  FindOneAdminParamDto,
  DeleteManyAdminDto,
  UpdateManyAdminDto,
} from './dto/params-admin.dto';
import { fileUploadOptions } from '@common/utils/file/file.config';
import { JwtAuthGuard } from '@provider/jwt/guards/jwt-auth.guard';

@Controller({
  path: 'admin/admin',
  version: ['1'],
})
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'image',
      fileUploadOptions({
        destination: './public/admin',
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
    @Body() body: CreateAdminDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const data = await this.adminService.create(body, file);

      return {
        message: 'เพิ่มข้อมูลแอดมิน',
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
  async findByCondition(@Query() query: FindAdminsByConditionQueryDto) {
    const result = await this.adminService.findByCondition(query);

    const meta = {
      page: Number(query.page),
      pageSize: Number(query.pageSize),
      pageCount: result.pageCount,
      total: result.total,
    };

    return {
      message: 'เรียกดูข้อมูลแอดมินทั้งหมด',
      ...(meta && { meta }),
      error: 0,
      data: result.data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.adminService.findAll();
    return {
      message: 'เรียกดูข้อมูลแอดมินทั้งหมด',
      error: 0,
      data,
    };
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param() params: FindOneAdminParamDto) {
    const data = await this.adminService.findOne(+params.id);
    return {
      message: 'เรียกดูข้อมูลแอดมินตามรหัส',
      error: 0,
      data,
    };
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor(
      'image',
      fileUploadOptions({
        destination: './public/admin',
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
    @Body() body: UpdateAdminDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = await this.adminService.update(+id, body, file);

    return {
      message: 'แก้ไขข้อมูลแอดมินตามรหัส',
      error: 0,
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.adminService.remove(+id);

    return {
      message: 'ลบข้อมูลแอดมินตามรหัส',
      error: 0,
      data,
    };
  }

  @Post('delete-many')
  async removeMany(@Body() body: DeleteManyAdminDto) {
    const data = await this.adminService.removeMany(body.id);

    return {
      message: 'ลบข้อมูลแอดมินหลายแถว',
      error: 0,
      data,
    };
  }

  @Patch('update/status/:id')
  async updateStatusOne(
    @Param('id') id: string,
    @Body() body: UpdateStatusAdminDto,
  ) {
    const data = await this.adminService.updateStatusOne(+id, body);

    return {
      message: 'แก้ไขแอดมินตามรหัส',
      error: 0,
      data,
    };
  }

  @Post('update-status-many')
  async updateStatusMany(@Body() body: UpdateManyAdminDto) {
    const data = await this.adminService.updateStatusMany(body.id, body.status);

    return {
      message: 'เปลี่ยนสถานะแอดมินหลายแถว',
      error: 0,
      data,
    };
  }
}
