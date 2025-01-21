import { CreateDistrictDto } from './create-district.dto';
declare const UpdateDistrictDto_base: import("@nestjs/common").Type<Partial<CreateDistrictDto>>;
export declare class UpdateDistrictDto extends UpdateDistrictDto_base {
    id: number;
}
export declare class DeleteManyDistrictDto {
    id: number[];
}
export {};
