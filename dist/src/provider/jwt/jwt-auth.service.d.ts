import { JwtService } from '@nestjs/jwt';
export declare class JwtAuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    getTokensAdmin(email: string, adminId?: number): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    decodeToken(token: string): any;
    getTokensUser(userId: number, line_id: string): Promise<string>;
    validateToken(token: string): Promise<any>;
}
