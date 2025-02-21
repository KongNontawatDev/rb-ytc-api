import { SignUpDto, SignInDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordFromOwnerDto } from './dto/auth.dto';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { JwtAuthService } from '@provider/jwt/jwt-auth.service';
import { Tokens } from '@provider/jwt/types/tokens.type';
import { MailerService } from '@provider/mailer/mailer.service';
export declare class AuthService {
    private prisma;
    private jwtAuthService;
    private mailService;
    constructor(prisma: PrismaService, jwtAuthService: JwtAuthService, mailService: MailerService);
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
    sendLoginLink(email: string): Promise<string>;
    validateToken(token: string): Promise<{
        accessToken: string;
        refreshToken: string;
        id: number;
        name: string;
        status: number;
        email: string;
        image: string | null;
        role_id: number;
    } | undefined>;
}
