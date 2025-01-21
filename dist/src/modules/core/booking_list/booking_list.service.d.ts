import { CreateBookingListDto } from './dto/create-booking_list.dto';
import { UpdateBookingListDto, UpdateStatusBookingListDto } from './dto/update-booking_list.dto';
import { PrismaService } from '@provider/prisma/prisma.service';
import { FindBookingListsByConditionQueryDto } from './dto/params-booking_list.dto';
import { Prisma } from '@prisma/client';
import { DateService } from '@common/utils/date/date.service';
export declare class BookingListService {
    private db;
    private date;
    constructor(db: PrismaService, date: DateService);
    create(data: CreateBookingListDto): Promise<({
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
    }) | undefined>;
    findByCondition(query: FindBookingListsByConditionQueryDto): Promise<{
        data: ({
            department: {
                id: number;
                name: string;
            };
            room: {
                id: number;
                name: string;
                location: string;
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
        })[];
        pageCount: number;
        total: number;
    }>;
    findAll(): Promise<{
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
    }[] | undefined>;
    findCount(): Promise<number | undefined>;
    findOne(id: number): Promise<({
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
    }) | null | undefined>;
    findManyByUser(user_id: number): Promise<({
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
    })[] | undefined>;
    findAllCurrentMonth(): Promise<{
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
    }[] | undefined>;
    findManyByRoomForCalendarAndTimeline(room_id: number): Promise<{
        id: number;
        title: string;
        booking_number: string;
        user_name: string;
        book_start: Date;
        book_end: Date;
    }[] | undefined>;
    findManyByUserForCalendarAndTimeline(user_id: number): Promise<{
        id: number;
        title: string;
        booking_number: string;
        user_name: string;
        book_start: Date;
        book_end: Date;
    }[] | undefined>;
    update(id: number, data: UpdateBookingListDto): Promise<{
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
    } | undefined>;
    updateStatusMany(ids: number[], status: number): Promise<Prisma.BatchPayload | undefined>;
    updateStatusOne(id: number, data: UpdateStatusBookingListDto): Promise<{
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
    } | undefined>;
    remove(id: number): Promise<{
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
    } | undefined>;
    removeMany(id: number[]): Promise<Prisma.BatchPayload | undefined>;
    generateBookingNumber(): string;
}
