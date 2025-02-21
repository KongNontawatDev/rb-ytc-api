import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordFromOtherDto, ChangePasswordFromOwnerDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(dto: SignInDto): Promise<{
        message: string;
        error: number;
        data: import("../../../provider/jwt/types/tokens.type").Tokens;
    }>;
    signUp(dto: SignUpDto): Promise<{
        message: string;
        error: number;
        data: import("../../../provider/jwt/types/tokens.type").Tokens;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
        error: number;
        data: {
            hashed_token: string;
        } | null;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
        error: number;
        data: {};
    }>;
    changePasswordFormOwner(req: any, dto: ChangePasswordFromOwnerDto): Promise<{
        message: string;
        error: number;
        data: {};
    }>;
    changePasswordFromOther(body: ChangePasswordFromOtherDto): Promise<{
        message: string;
        error: number;
        data: {};
    }>;
    refreshToken(refreshToken: string): Promise<{
        message: string;
        error: number;
        data: import("../../../provider/jwt/types/tokens.type").Tokens;
    }>;
    logout(adminId: number): Promise<{
        message: string;
        error: number;
        data: void;
    }>;
    loginWithEmail(email: string): Promise<{
        message: string;
        error: number;
        data: string;
    }>;
    validateLoginWithEmail(token: string): Promise<{
        message: string;
        error: number;
        data: {
            accessToken: string;
            refreshToken: string;
            id: number;
            name: string;
            status: number;
            email: string;
            image: string | null;
            role_id: number;
        } | undefined;
    }>;
}
