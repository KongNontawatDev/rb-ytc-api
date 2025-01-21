import { AuthService } from './auth.service';
import { JwtAuthService } from '@provider/jwt/jwt-auth.service';
import { UserService } from '@modules/core/user/user.service';
import { CreateUserDto } from '@modules/core/user/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    private readonly jwtAuthService;
    private readonly userService;
    constructor(authService: AuthService, jwtAuthService: JwtAuthService, userService: UserService);
    checkRegister(body: {
        line_id: string;
    }): Promise<{
        message: string;
        error: number;
        data: {
            token: string;
            id: number;
            created_at: Date;
            updated_at: Date;
            status: number;
            full_name: string;
            tel: string;
            line_name: string;
            line_id: string;
            department_id: number;
            image: string | null;
        };
    }>;
    register(body: CreateUserDto, file: Express.Multer.File): Promise<{
        message: string;
        data: {
            token: string;
            id: number;
            created_at: Date;
            updated_at: Date;
            status: number;
            full_name: string;
            tel: string;
            line_name: string;
            line_id: string;
            department_id: number;
            image: string | null;
        };
    }>;
}
