import { BaseQueryDto } from '@common/dto/base.dto';
export declare class FindDepartmentsByConditionQueryDto extends BaseQueryDto {
    status?: string;
}
export declare class FindOneDepartmentParamDto {
    id: string;
}
export declare class UpdateDepartmentParamDto {
    id: string;
}
export declare class DeleteDepartmentParamDto {
    id: string;
}
export declare class DeleteManyDepartmentDto {
    id: number[];
}
export declare class UpdateManyDepartmentDto {
    id: number[];
    status: number;
}
export declare class UpdateStatusDepartmentDto {
    status: number;
}
