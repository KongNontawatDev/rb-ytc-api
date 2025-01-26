import { BaseQueryDto } from '@common/dto/base.dto';
export declare class FindBookingListsByConditionQueryDto extends BaseQueryDto {
    status?: string;
    book_start?: Date;
    book_end?: Date;
    user_id?: string;
    room_id?: string;
}
export declare class FindOneBookingListParamDto {
    id: string;
}
export declare class FindRoomBookingDateParamDto {
    room_id: string;
}
export declare class findManyBookingListByUserDto {
    user_id: string;
}
export declare class findManyBookingListByRoomForCalendarAndTimelineParamDto {
    room_id: string;
}
export declare class findManyBookingListByUserForCalendarAndTimelineParamDto {
    user_id: string;
}
export declare class UpdateBookingListParamDto {
    id: string;
}
export declare class DeleteBookingListParamDto {
    id: string;
}
export declare class DeleteManyBookingListDto {
    id: number[];
}
export declare class UpdateManyBookingListDto {
    id: number[];
    status: number;
}
