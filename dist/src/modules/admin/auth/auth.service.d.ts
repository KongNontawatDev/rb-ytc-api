import { SignUpDto, SignInDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordFromOwnerDto } from './dto/auth.dto';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { JwtAuthService } from '@provider/jwt/jwt-auth.service';
import { Tokens } from '@provider/jwt/types/tokens.type';
export declare class AuthService {
    private prisma;
    private jwtAuthService;
    constructor(prisma: PrismaService, jwtAuthService: JwtAuthService);
    signUp(dto: SignUpDto): Promise<Tokens>;
    signIn(body: SignInDto): Promise<Tokens>;
    refreshToken(oldRefreshToken: string): Promise<Tokens>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        hashed_token: string;
    } | null>;
    resetPassword(dto: ResetPasswordDto): Promise<void>;
    changePassword(adminId: number, dto: ChangePasswordFromOwnerDto): Promise<void>;
    logout(adminId: number): Promise<void>;
    hashData(data: string): Promise<string>;
}
