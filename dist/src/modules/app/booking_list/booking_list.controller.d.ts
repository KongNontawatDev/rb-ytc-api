import { DateService } from '@common/utils/date/date.service';
import { BookingListService } from '@modules/core/booking_list/booking_list.service';
import { CreateBookingListDto } from '@modules/core/booking_list/dto/create-booking_list.dto';
import { findManyBookingListByUserDto, FindOneBookingListParamDto, FindRoomBookingDateParamDto } from '@modules/core/booking_list/dto/params-booking_list.dto';
import { UpdateBookingListDto, UpdateStatusBookingListDto } from '@modules/core/booking_list/dto/update-booking_list.dto';
import { LineMessagingService } from '@provider/line-messaging-api/line-messaging.service';
export declare class BookingListController {
    private readonly bookingListService;
    private readonly lineMessageingService;
    private dateService;
    constructor(bookingListService: BookingListService, lineMessageingService: LineMessagingService, dateService: DateService);
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
    findAllCurrentMonth(): Promise<{
        message: string;
        error: number;
        data: ({
            room: {
                name: string;
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
        })[] | undefined;
    }>;
    findAllByUser(params: findManyBookingListByUserDto): Promise<{
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
        })[] | undefined;
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
    findRoomBookedDates(params: FindRoomBookingDateParamDto): Promise<{
        message: string;
        error: number;
        data: Date[];
    }>;
    create(body: CreateBookingListDto): Promise<{
        message: string;
        error: number;
        data: ({
            user: {
                line_id: string;
            };
            room: {
                name: string;
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
    updateStatusOne(id: string, body: UpdateStatusBookingListDto): Promise<{
        message: string;
        error: number;
        data: ({
            user: {
                line_id: string;
            };
            room: {
                name: string;
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
}
