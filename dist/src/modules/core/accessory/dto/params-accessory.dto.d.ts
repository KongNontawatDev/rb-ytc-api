import { BaseQueryDto } from '@common/dto/base.dto';
export declare class FindAccessorysByConditionQueryDto extends BaseQueryDto {
    status?: string;
}
export declare class FindOneAccessoryParamDto {
    id: string;
}
export declare class UpdateAccessoryParamDto {
    id: string;
}
export declare class DeleteAccessoryParamDto {
    id: string;
}
export declare class DeleteManyAccessoryDto {
    id: number[];
}
export declare class UpdateManyAccessoryDto {
    id: number[];
    status: number;
}
