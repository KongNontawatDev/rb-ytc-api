import { booking_list } from '@prisma/client';
export declare class BookingListDto implements Partial<booking_list> {
    id: number;
    department_id: number;
    booking_number: string;
    user_id: number;
    room_id: number;
    tel: string;
    user_name: string;
    title: string;
    detail: string;
    book_start: Date;
    book_end: Date;
    status: number;
    created_at: Date;
    updated_at: Date;
}
