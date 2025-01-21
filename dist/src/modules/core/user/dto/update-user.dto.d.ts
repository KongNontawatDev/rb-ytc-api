import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<Omit<CreateUserDto, "image">>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    id: number;
    status: number;
    image?: string | Express.Multer.File | null;
}
export declare class UpdateStatusUserDto {
    status: number;
}
export {};
