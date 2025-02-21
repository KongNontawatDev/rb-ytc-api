import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  SignUpDto,
  SignInDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  ChangePasswordFromOwnerDto,
} from './dto/auth.dto';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { JwtAuthService } from '@provider/jwt/jwt-auth.service';
import { Tokens } from '@provider/jwt/types/tokens.type';
import { MailerService } from '@provider/mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtAuthService: JwtAuthService,
    private mailService: MailerService,
  ) {}

  async signUp(dto: SignUpDto): Promise<Tokens> {
    const adminExists = await this.prisma.admin.findUnique({
      where: { email: dto.email },
    });

    if (adminExists) {
      throw new BadRequestException('admin already exists');
    }

    const hashedPassword = await this.hashData(dto.password);
    const admin = await this.prisma.admin.create({
      data: {
        email: dto.email,
        name: dto.name,
        image: 'default.png',
        status: 1,
        role_id: dto.role_id,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        image: true,
        name: true,
        role_id: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    const tokens = await this.jwtAuthService.getTokensAdmin(
      admin.email!,
      admin.id,
    );
    return {
      ...tokens,
      ...admin,
    };
  }

  async signIn(body: SignInDto): Promise<Tokens> {
    const { email, password } = body;
    const admin = await this.prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      throw new BadRequestException(
        'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง! โปรดลองอีกครั้ง',
      );
    }

    const passwordMatches = await bcrypt.compare(password, admin.password);
    if (!passwordMatches) {
      throw new BadRequestException(
        'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง! โปรดลองอีกครั้ง',
      );
    }

    // Generate Tokens
    const tokens = await this.jwtAuthService.getTokensAdmin(email, admin.id);

    // Save Refresh Token to Database (hashed for security)
    const hashedRefreshToken = await this.hashData(tokens.refreshToken);
    const data = await this.prisma.admin.update({
      where: { id: admin.id },
      data: { refresh_token: hashedRefreshToken },
      select: {
        id: true,
        email: true,
        image: true,
        name: true,
        role_id: true,
        status: true,
      },
    });

    return {
      ...data,
      ...tokens,
    };
  }

  async refreshToken(oldRefreshToken: string): Promise<Tokens> {
    // Decode and verify token
    const payload = this.jwtAuthService.decodeToken(oldRefreshToken);
    if (!payload) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const admin = await this.prisma.admin.findUnique({
      where: { id: payload.sub },
    });
    if (!admin || !admin.refresh_token) {
      throw new UnauthorizedException('Unauthorized');
    }

    // Verify if the old token matches the one stored in the database
    const refreshTokenMatches = await bcrypt.compare(
      oldRefreshToken,
      admin.refresh_token,
    );
    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Generate new tokens
    const tokens = await this.jwtAuthService.getTokensAdmin(
      admin.email,
      admin.id,
    );

    // Update the refresh token in the database
    const hashedNewRefreshToken = await this.hashData(tokens.refreshToken);
    await this.prisma.admin.update({
      where: { id: admin.id },
      data: { refresh_token: hashedNewRefreshToken },
    });

    return tokens;
  }

  async forgotPassword(
    dto: ForgotPasswordDto,
  ): Promise<{ hashed_token: string } | null> {
    const admin = await this.prisma.admin.findUnique({
      where: { email: dto.email },
    });

    if (!admin) {
      throw new BadRequestException('This email is not registered.');
    }

    // สร้าง reset token และทำการ hash
    const reset_token = admin.email + Date.now(); // หรือใช้ string ที่กำหนดเอง
    const saltRounds = 10; // จำนวนรอบในการ hash
    const hashed_token = await bcrypt.hash(reset_token, saltRounds);

    const reset_token_expiry = new Date(Date.now() + 3600000); // 1 ชั่วโมง

    await this.prisma.admin.update({
      where: { id: admin.id },
      data: {
        reset_token: hashed_token,
        reset_token_expiry,
      },
    });


    await this.mailService.sendPasswordResetEmail(
      admin.email,
      hashed_token, // ส่ง hashed token นี้ให้ผู้ใช้
    );

    return { hashed_token };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const admin = await this.prisma.admin.findFirst({
      where: {
        reset_token: dto.token,
        reset_token_expiry: {
          gt: new Date(),
        },
      },
    });

    if (!admin) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await this.hashData(dto.newPassword);

    await this.prisma.admin.update({
      where: { id: admin.id },
      data: {
        password: hashedPassword,
        reset_token: null,
        reset_token_expiry: null,
      },
    });
  }

  async changePassword(
    adminId: number,
    dto: ChangePasswordFromOwnerDto,
  ): Promise<void> {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });

    const passwordMatches = await bcrypt.compare(
      dto.currentPassword,
      admin?.password!,
    );
    if (!passwordMatches) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedPassword = await this.hashData(dto.newPassword);
    await this.prisma.admin.update({
      where: { id: adminId },
      data: { password: hashedPassword },
    });
  }

  async logout(adminId: number): Promise<void> {
    // Clear the refresh token in the database
    await this.prisma.admin.update({
      where: { id: adminId },
      data: { refresh_token: null },
    });
  }

  async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }

  async sendLoginLink(email: string) {
    // Check if the email is registered
    const existingUser = await this.prisma.admin.findFirst({
      where: { email },
      select: { id: true, email: true },
    });

    if (!existingUser) {
      throw new BadRequestException('This email is not registered.');
    }
    const token = this.jwtAuthService.getTokensAdmin(email);

    // Generate token for registered user
    await this.jwtAuthService.getTokensAdmin(email, existingUser.id);
    await this.mailService.sendLoginEmail(email, (await token).accessToken);

    return 'Login link sent to your email.';
  }

  async validateToken(token: string) {
    try {
      const tokenRes = await this.jwtAuthService.validateToken(token);
      if (tokenRes) {
        const newToken = await this.jwtAuthService.getTokensAdmin(tokenRes.context);
        const hashedRefreshToken = await this.hashData(newToken.refreshToken);
        const data = await this.prisma.admin.update({
          where: { email:tokenRes.context },
          data: { refresh_token: hashedRefreshToken },
          select: {
            id: true,
            email: true,
            image: true,
            name: true,
            role_id: true,
            status: true,
          },
        });
        return {
          ...data,
          ...newToken
        };
      }
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
