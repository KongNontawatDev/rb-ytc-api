import { CreateProvinceDto } from './create-province.dto';
import { BaseDto } from '@common/dto/base.dto';
declare const UpdateProvinceDto_base: import("@nestjs/common").Type<Partial<CreateProvinceDto>>;
export declare class UpdateProvinceDto extends UpdateProvinceDto_base {
    id: number;
}
export declare class DeleteManyProvinceDto extends BaseDto {
    id: number[];
}
export {};
