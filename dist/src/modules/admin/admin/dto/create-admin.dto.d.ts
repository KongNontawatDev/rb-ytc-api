export declare class CreateAdminDto {
    name: string;
    email: string;
    password: string;
    role_id: number;
    image: Express.Multer.File | string;
}
