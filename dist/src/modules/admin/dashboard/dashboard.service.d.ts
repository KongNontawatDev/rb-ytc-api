import { PrismaService } from '@provider/prisma/prisma.service';
export declare class DashboardService {
    private db;
    constructor(db: PrismaService);
    findAll(): Promise<{
        booking_list_count: number;
        room_count: number;
        user_count: number;
        accessory_count: number;
        bookings_by_month: {
            month: number;
            month_name: string;
            count: number;
        }[];
        booking_list: {
            id: number;
            room: {
                name: string;
            };
            title: string;
            book_start: Date;
            book_end: Date;
        }[];
    }>;
}
