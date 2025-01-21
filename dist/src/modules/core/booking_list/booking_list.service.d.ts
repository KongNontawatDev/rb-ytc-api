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
        })[];
        pageCount: number;
        total: number;
    }>;
    findAll(): Promise<{
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
    }[] | undefined>;
    findCount(): Promise<number | undefined>;
    findOne(id: number): Promise<({
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
    }) | null | undefined>;
    findManyByUser(user_id: number): Promise<({
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
    })[] | undefined>;
    findAllCurrentMonth(): Promise<{
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
    }[] | undefined>;
    findManyByRoomForCalendarAndTimeline(room_id: number): Promise<{
        id: number;
        booking_number: string;
        user_name: string;
        title: string;
        book_start: Date;
        book_end: Date;
    }[] | undefined>;
    findManyByUserForCalendarAndTimeline(user_id: number): Promise<{
        id: number;
        booking_number: string;
        user_name: string;
        title: string;
        book_start: Date;
        book_end: Date;
    }[] | undefined>;
    update(id: number, data: UpdateBookingListDto): Promise<{
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
    } | undefined>;
    updateStatusMany(ids: number[], status: number): Promise<Prisma.BatchPayload | undefined>;
    updateStatusOne(id: number, data: UpdateStatusBookingListDto): Promise<({
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
    }) | undefined>;
    remove(id: number): Promise<{
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
    } | undefined>;
    removeMany(id: number[]): Promise<Prisma.BatchPayload | undefined>;
    generateBookingNumber(): string;
}
