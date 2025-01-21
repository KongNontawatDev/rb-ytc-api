import {
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async getTokensAdmin(adminId: number, email: string): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = this.jwtService.sign(
      { sub: adminId, context:email,actor:'admin' },
      { expiresIn: '1d' }, 
    );

    const refreshToken = this.jwtService.sign(
      { sub: adminId },
      { expiresIn: '7d' }, 
    );

    return { accessToken, refreshToken };
  }

  decodeToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch {
      return null;
    }
  }

  async getTokensUser(userId: number, line_id: string) {
    const payload = { sub: userId, context: line_id, actor: 'user' };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
  }
}
