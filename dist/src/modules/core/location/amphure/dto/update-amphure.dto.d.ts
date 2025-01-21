import { CreateAmphureDto } from './create-amphure.dto';
declare const UpdateAmphureDto_base: import("@nestjs/common").Type<Partial<CreateAmphureDto>>;
export declare class UpdateAmphureDto extends UpdateAmphureDto_base {
    id: number;
}
export declare class DeleteManyAmphureDto {
    id: number[];
}
export {};
