import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  async getTokensAdmin(
    email: string,
    adminId?: number, // ทำให้เป็น optional
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: Record<string, any> = { context: email, actor: 'admin' };
    if (adminId) {
      payload.sub = adminId;
    }
  
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' });
  
    const refreshPayload = adminId ? { sub: adminId } : {};
    const refreshToken = this.jwtService.sign(refreshPayload, { expiresIn: '7d' });
  
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

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      return decoded; // หรือ return { email: decoded.email };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
