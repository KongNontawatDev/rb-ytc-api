import { BaseQueryDto } from '@common/dto/base.dto';
export declare class FindAdminsByConditionQueryDto extends BaseQueryDto {
    status?: string;
    role_id?: string;
}
export declare class FindOneAdminParamDto {
    id: string;
}
export declare class UpdateAdminParamDto {
    id: string;
}
export declare class DeleteAdminParamDto {
    id: string;
}
export declare class DeleteManyAdminDto {
    id: number[];
}
export declare class UpdateManyAdminDto {
    id: number[];
    status: number;
}
