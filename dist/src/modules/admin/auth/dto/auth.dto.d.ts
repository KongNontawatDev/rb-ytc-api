export declare class SignInDto {
    email: string;
    password: string;
}
export declare class SignUpDto {
    email: string;
    name: string;
    role_id: number;
    password: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    token: string;
    newPassword: string;
}
export declare class ChangePasswordFromOwnerDto {
    currentPassword: string;
    newPassword: string;
}
export declare class ChangePasswordFromOtherDto {
    id: number;
    currentPassword: string;
    newPassword: string;
}
