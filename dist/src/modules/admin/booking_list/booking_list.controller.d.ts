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
            user: {
                line_id: string;
            };
        } & {
            id: number;
            created_at: Date;
            updated_at: Date;
            status: number;
            tel: string;
            department_id: number;
            title: string;
            user_id: number;
            room_id: number;
            booking_number: string;
            user_name: string;
            detail: string | null;
            book_start: Date;
            book_end: Date;
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
            created_at: Date;
            updated_at: Date;
            status: number;
            tel: string;
            department_id: number;
            title: string;
            user_id: number;
            room_id: number;
            booking_number: string;
            user_name: string;
            detail: string | null;
            book_start: Date;
            book_end: Date;
        }[] | undefined;
    }>;
    findOne(params: FindOneBookingListParamDto): Promise<{
        message: string;
        error: number;
        data: ({
            department: {
                id: number;
                name: string;
                created_at: Date;
                updated_at: Date;
                status: number;
            };
            room: {
                room_image: {
                    id: number;
                    image: string;
                    room_id: number;
                }[];
            } & {
                id: number;
                name: string;
                created_at: Date;
                updated_at: Date;
                status: number;
                size: string;
                detail: string | null;
                location: string;
                capacity: string;
            };
        } & {
            id: number;
            created_at: Date;
            updated_at: Date;
            status: number;
            tel: string;
            department_id: number;
            title: string;
            user_id: number;
            room_id: number;
            booking_number: string;
            user_name: string;
            detail: string | null;
            book_start: Date;
            book_end: Date;
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
            title: string;
            booking_number: string;
            user_name: string;
            book_start: Date;
            book_end: Date;
        }[] | undefined;
    }>;
    findManyByUserForCalendarAndTimeline(params: findManyBookingListByUserForCalendarAndTimelineParamDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            title: string;
            booking_number: string;
            user_name: string;
            book_start: Date;
            book_end: Date;
        }[] | undefined;
    }>;
    update(id: string, body: UpdateBookingListDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            created_at: Date;
            updated_at: Date;
            status: number;
            tel: string;
            department_id: number;
            title: string;
            user_id: number;
            room_id: number;
            booking_number: string;
            user_name: string;
            detail: string | null;
            book_start: Date;
            book_end: Date;
        } | undefined;
    }>;
    remove(id: string): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            created_at: Date;
            updated_at: Date;
            status: number;
            tel: string;
            department_id: number;
            title: string;
            user_id: number;
            room_id: number;
            booking_number: string;
            user_name: string;
            detail: string | null;
            book_start: Date;
            book_end: Date;
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
        data: {
            id: number;
            created_at: Date;
            updated_at: Date;
            status: number;
            tel: string;
            department_id: number;
            title: string;
            user_id: number;
            room_id: number;
            booking_number: string;
            user_name: string;
            detail: string | null;
            book_start: Date;
            book_end: Date;
        } | undefined;
    }>;
}
