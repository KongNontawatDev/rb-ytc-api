import { BookingListService } from '@modules/core/booking_list/booking_list.service';
import { CreateBookingListDto } from '@modules/core/booking_list/dto/create-booking_list.dto';
import { findManyBookingListByUserDto, FindOneBookingListParamDto } from '@modules/core/booking_list/dto/params-booking_list.dto';
import { UpdateBookingListDto, UpdateStatusBookingListDto } from '@modules/core/booking_list/dto/update-booking_list.dto';
import { LineMessagingService } from '@provider/line-messaging-api/line-messaging.service';
export declare class BookingListController {
    private readonly bookingListService;
    private readonly lineMessageingService;
    constructor(bookingListService: BookingListService, lineMessageingService: LineMessagingService);
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
    findAllCurrentMonth(): Promise<{
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
    findAllByUser(params: findManyBookingListByUserDto): Promise<{
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
        })[] | undefined;
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
