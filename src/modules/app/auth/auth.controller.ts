import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { fileUploadOptions } from '@common/utils/file/file.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthService } from '@provider/jwt/jwt-auth.service';
import { UserService } from '@modules/core/user/user.service';
import { CreateUserDto } from '@modules/core/user/dto/create-user.dto';

@Controller({
  path: 'app/auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtAuthService: JwtAuthService,
    private readonly userService: UserService,
  ) {}

  @Post('check_register')
  async checkRegister(@Body() body: { line_id: string }) {
    const user = await this.authService.checkRegister(body.line_id);

    if (user) {
      const token = await this.jwtAuthService.getTokensUser(
        user.id,
        user.line_id,
      );
      return {
        message: 'เคยลงทะเบียนแล้ว',
        error: 0,
        data: {
          ...user,
          token:token
        },
      };
    } else {
      throw new ForbiddenException('บัญชีนี้ยังไม่ลงทะเบียน ต้องลงทะเบียนก่อน');
    }
  }

  @Post('register')
  @UseInterceptors(
    FileInterceptor(
      'image',
      fileUploadOptions({
        destination: './public/user',
        maxFileSize: 5_000_000,
        mimeTypes: ['image/jpeg', 'image/png'],
      }),
    ),
  )
  async register(
    @Body() body: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = await this.userService.create(body, file);

    if (user) {
      const token = await this.jwtAuthService.getTokensUser(
        user.id,
        user.line_id,
      );
      return {
        message: 'ลงทะเบียนสำเร็จ',
        data: {
          ...user,
          token: token, // ส่ง JWT token กลับไปให้ client
        },
      };
    } else {
      throw new BadRequestException('ลงทะเบียนไม่สำเร็จ');
    }
  }
}
