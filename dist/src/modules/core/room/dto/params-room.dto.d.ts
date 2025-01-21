import { BaseQueryDto } from '@common/dto/base.dto';
export declare class FindRoomsByConditionQueryDto extends BaseQueryDto {
    status?: string;
}
export declare class FindOneRoomParamDto {
    id: string;
}
export declare class UpdateRoomParamDto {
    id: string;
}
export declare class DeleteRoomParamDto {
    id: string;
}
export declare class DeleteManyRoomDto {
    id: number[];
}
export declare class UpdateManyRoomDto {
    id: number[];
    status: number;
}
