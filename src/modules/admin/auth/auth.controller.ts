import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignUpDto,
  SignInDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  ChangePasswordFromOtherDto,
  ChangePasswordFromOwnerDto,
} from './dto/auth.dto';
import { JwtAuthGuard } from '@provider/jwt/guards/jwt-auth.guard';

@Controller({
  path: 'admin/auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() dto: SignInDto) {
    const data = await this.authService.signIn(dto);
    return {
      message: 'เข้าสู่ระบบสำเร็จ',
      error: 0,
      data,
    };
  }

  @Post('signup')
  async signUp(@Body() dto: SignUpDto) {
    const data = await this.authService.signUp(dto);
    return {
      message: 'สมัครสมาชิกสำเร็จ',
      error: 0,
      data,
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    const data = await this.authService.forgotPassword(dto);
    return {
      message: 'ลืมรหัสผ่าน',
      error: 0,
      data,
    };
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto);
    return {
      message: 'รีเช็ทรหัสผ่านสำเร็จ',
      error: 0,
      data: {},
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password/owner')
  async changePasswordFormOwner(@Request() req, @Body() dto: ChangePasswordFromOwnerDto) {
    await this.authService.changePassword(req.user.userId, dto);
    return {
      message: 'เปลี่ยนรหัสผ่านสำเร็จ',
      error: 0,
      data: {},
    };
  }

    @UseGuards(JwtAuthGuard)
  @Post('change-password/other')
  async changePasswordFromOther(@Body() body: ChangePasswordFromOtherDto) {
    const {id,...bodyData} = body
    await this.authService.changePassword(id,bodyData);
    return {
      message: 'เปลี่ยนรหัสผ่านสำเร็จ',
      error: 0,
      data: {},
    };
  }

  @Post('refresh-token')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
  ) {
    const data = await this.authService.refreshToken(refreshToken);
    return {
      message:'รีเฟรช Token',
      error:0,
      data
    }
  }

  @Post('logout')
  async logout(@Body('adminId') adminId: number) {
    const data = await this.authService.logout(adminId);
    return {
      message:'ออกจากระบบสำเร็จ',
      error:0,
      data
    }
  }
}
