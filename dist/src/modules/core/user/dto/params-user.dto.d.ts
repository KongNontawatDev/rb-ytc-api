import { BaseQueryDto } from '@common/dto/base.dto';
export declare class FindUsersByConditionQueryDto extends BaseQueryDto {
    status?: string;
    department_id?: string;
}
export declare class FindOneUserParamDto {
    id: string;
}
export declare class UpdateUserParamDto {
    id: string;
}
export declare class DeleteUserParamDto {
    id: string;
}
export declare class DeleteManyUserDto {
    id: number[];
}
export declare class UpdateManyUserDto {
    id: number[];
    status: number;
}
