import { CreateAdminDto } from './create-admin.dto';
declare const UpdateAdminDto_base: import("@nestjs/common").Type<Partial<Omit<CreateAdminDto, "image">>>;
export declare class UpdateAdminDto extends UpdateAdminDto_base {
    id: number;
    status: number;
    image?: string | Express.Multer.File | null;
    password: string;
}
export declare class UpdateStatusAdminDto {
    status: number;
}
export {};
