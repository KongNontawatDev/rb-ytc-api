import { CreateAccessoryDto } from './create-accessory.dto';
declare const UpdateAccessoryDto_base: import("@nestjs/common").Type<Partial<Omit<CreateAccessoryDto, "image">>>;
export declare class UpdateAccessoryDto extends UpdateAccessoryDto_base {
    id: number;
    status: number;
    image?: string | Express.Multer.File | null;
}
export declare class UpdateStatusAccessoryDto {
    status: number;
}
export {};
