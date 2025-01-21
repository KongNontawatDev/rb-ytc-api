import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUploadOptions } from '@common/utils/file/file.config';
import { JwtAuthGuard } from '@provider/jwt/guards/jwt-auth.guard';
import { UserService } from '@modules/core/user/user.service';
import {
  FindOneUserParamDto,
} from '@modules/core/user/dto/params-user.dto';
import {
  UpdateUserDto,
} from '@modules/core/user/dto/update-user.dto';

@Controller({
  path: 'app/user',
  version: ['1'],
})
// @UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

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


}
