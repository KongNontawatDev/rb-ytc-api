import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '@provider/prisma/prisma.service';
import { FileModule } from '@common/utils/file/file.module';
import { CompressionModule } from '@common/utils/compression/compression.module';
import { JwtAuthService } from '@provider/jwt/jwt-auth.service';
import { JwtStrategy } from '@provider/jwt/strategies/jwt-auth.strategy';
import { JwtAuthModule } from '@provider/jwt/jwt-auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from '@modules/core/user/user.service';

@Module({
  imports: [
    FileModule,
    CompressionModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
    JwtAuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthService, PrismaService, JwtStrategy,UserService],
})
export class AuthModule {}
