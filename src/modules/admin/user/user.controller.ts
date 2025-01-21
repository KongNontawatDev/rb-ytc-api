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
import { FileService } from 'src/common/utils/file/file.service';
import { fileUploadOptions } from '@common/utils/file/file.config';
import { JwtAuthGuard } from '@provider/jwt/guards/jwt-auth.guard';
import { UserService } from '@modules/core/user/user.service';
import { CreateUserDto } from '@modules/core/user/dto/create-user.dto';
import {
  DeleteManyUserDto,
  FindOneUserParamDto,
  FindUsersByConditionQueryDto,
  UpdateManyUserDto,
} from '@modules/core/user/dto/params-user.dto';
import {
  UpdateStatusUserDto,
  UpdateUserDto,
} from '@modules/core/user/dto/update-user.dto';

@Controller({
  path: 'admin/user',
  version: ['1'],
})
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'image',
      fileUploadOptions({
        destination: './public/user',
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
    @Body() body: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const data = await this.userService.create(body, file);

      return {
        message: 'เพิ่มข้อมูลผู้ใช้',
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
  async findByCondition(@Query() query: FindUsersByConditionQueryDto) {
    const result = await this.userService.findByCondition(query);

    const meta = {
      page: Number(query.page),
      pageSize: Number(query.pageSize),
      pageCount: result.pageCount,
      total: result.total,
    };

    return {
      message: 'เรียกดูข้อมูลผู้ใช้ทั้งหมด',
      ...(meta && { meta }),
      error: 0,
      data: result.data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.userService.findAll();
    return {
      message: 'เรียกดูข้อมูลผู้ใช้ทั้งหมด',
      error: 0,
      data,
    };
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param() params: FindOneUserParamDto) {
    const data = await this.userService.findOne(+params.id);
    return {
      message: 'เรียกดูข้อมูลผู้ใช้ตามรหัส',
      error: 0,
      data,
    };
  }

  @Get('/list/dropdown')
  async findForDropdown() {
    const data = await this.userService.findForDropdown();
    return {
      message: 'เรียกดูข้อมูลผู้ใช้แสดงที่ dropdown',
      error: 0,
      data,
    };
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor(
      'image',
      fileUploadOptions({
        destination: './public/user',
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
    @Body() body: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = await this.userService.update(+id, body, file);

    return {
      message: 'แก้ไขข้อมูลผู้ใช้ตามรหัส',
      error: 0,
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.userService.remove(+id);

    return {
      message: 'ลบข้อมูลผู้ใช้ตามรหัส',
      error: 0,
      data,
    };
  }

  @Post('delete-many')
  async removeMany(@Body() body: DeleteManyUserDto) {
    const data = await this.userService.removeMany(body.id);

    return {
      message: 'ลบข้อมูลผู้ใช้หลายแถว',
      error: 0,
      data,
    };
  }

  @Patch('update/status/:id')
  async updateStatusOne(
    @Param('id') id: string,
    @Body() body: UpdateStatusUserDto,
  ) {
    const data = await this.userService.updateStatusOne(+id, body);

    return {
      message: 'แก้ไขสถานะแผนก/ฝ่ายงานตามรหัส',
      error: 0,
      data,
    };
  }

  @Post('update-status-many')
  async updateStatusMany(@Body() body: UpdateManyUserDto) {
    const data = await this.userService.updateStatusMany(body.id, body.status);

    return {
      message: 'เปลี่ยนสถานะผู้ใช้หลายแถว',
      error: 0,
      data,
    };
  }
}
