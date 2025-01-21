import { BookingListService } from '@modules/core/booking_list/booking_list.service';
import { CreateBookingListDto } from '@modules/core/booking_list/dto/create-booking_list.dto';
import { DeleteManyBookingListDto, FindBookingListsByConditionQueryDto, findManyBookingListByRoomForCalendarAndTimelineParamDto, findManyBookingListByUserForCalendarAndTimelineParamDto, FindOneBookingListParamDto, UpdateManyBookingListDto } from '@modules/core/booking_list/dto/params-booking_list.dto';
import { UpdateBookingListDto, UpdateStatusBookingListDto } from '@modules/core/booking_list/dto/update-booking_list.dto';
export declare class BookingListController {
    private readonly bookingListService;
    constructor(bookingListService: BookingListService);
    create(body: CreateBookingListDto): Promise<{
        message: string;
        error: number;
        data: ({
            room: {
                name: string;
            };
            user: {
                line_id: string;
            };
        } & {
            id: number;
            department_id: number;
            user_id: number;
            room_id: number;
            booking_number: string;
            tel: string;
            user_name: string;
            title: string;
            detail: string | null;
            book_start: Date;
            book_end: Date;
            status: number;
            created_at: Date;
            updated_at: Date;
        }) | undefined;
    }>;
    findByCondition(query: FindBookingListsByConditionQueryDto): Promise<{
        error: number;
        data: any[] | undefined;
        meta?: {
            page: number;
            pageSize: number;
            pageCount: number | undefined;
            total: number | undefined;
        } | undefined;
        message: string;
    } | undefined>;
    findAll(): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            department_id: number;
            user_id: number;
            room_id: number;
            booking_number: string;
            tel: string;
            user_name: string;
            title: string;
            detail: string | null;
            book_start: Date;
            book_end: Date;
            status: number;
            created_at: Date;
            updated_at: Date;
        }[] | undefined;
    }>;
    findOne(params: FindOneBookingListParamDto): Promise<{
        message: string;
        error: number;
        data: ({
            department: {
                id: number;
                status: number;
                created_at: Date;
                updated_at: Date;
                name: string;
            };
            room: {
                room_image: {
                    id: number;
                    room_id: number;
                    image: string;
                }[];
            } & {
                id: number;
                detail: string | null;
                status: number;
                created_at: Date;
                updated_at: Date;
                name: string;
                location: string;
                size: string;
                capacity: string;
            };
        } & {
            id: number;
            department_id: number;
            user_id: number;
            room_id: number;
            booking_number: string;
            tel: string;
            user_name: string;
            title: string;
            detail: string | null;
            book_start: Date;
            book_end: Date;
            status: number;
            created_at: Date;
            updated_at: Date;
        }) | null | undefined;
    }>;
    findCount(): Promise<{
        message: string;
        error: number;
        data: number | undefined;
    }>;
    findManyByRoomForCalendarAndTimeline(params: findManyBookingListByRoomForCalendarAndTimelineParamDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            booking_number: string;
            user_name: string;
            title: string;
            book_start: Date;
            book_end: Date;
        }[] | undefined;
    }>;
    findManyByUserForCalendarAndTimeline(params: findManyBookingListByUserForCalendarAndTimelineParamDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            booking_number: string;
            user_name: string;
            title: string;
            book_start: Date;
            book_end: Date;
        }[] | undefined;
    }>;
    update(id: string, body: UpdateBookingListDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            department_id: number;
            user_id: number;
            room_id: number;
            booking_number: string;
            tel: string;
            user_name: string;
            title: string;
            detail: string | null;
            book_start: Date;
            book_end: Date;
            status: number;
            created_at: Date;
            updated_at: Date;
        } | undefined;
    }>;
    remove(id: string): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            department_id: number;
            user_id: number;
            room_id: number;
            booking_number: string;
            tel: string;
            user_name: string;
            title: string;
            detail: string | null;
            book_start: Date;
            book_end: Date;
            status: number;
            created_at: Date;
            updated_at: Date;
        } | undefined;
    }>;
    removeMany(body: DeleteManyBookingListDto): Promise<{
        message: string;
        error: number;
        data: import(".prisma/client").Prisma.BatchPayload | undefined;
    }>;
    updateStatusMany(body: UpdateManyBookingListDto): Promise<{
        message: string;
        error: number;
        data: import(".prisma/client").Prisma.BatchPayload | undefined;
    }>;
    updateStatusOne(id: string, body: UpdateStatusBookingListDto): Promise<{
        message: string;
        error: number;
        data: ({
            room: {
                name: string;
            };
            user: {
                line_id: string;
            };
        } & {
            id: number;
            department_id: number;
            user_id: number;
            room_id: number;
            booking_number: string;
            tel: string;
            user_name: string;
            title: string;
            detail: string | null;
            book_start: Date;
            book_end: Date;
            status: number;
            created_at: Date;
            updated_at: Date;
        }) | undefined;
    }>;
}
