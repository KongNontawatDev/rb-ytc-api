import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    findAll(): Promise<{
        message: string;
        error: number;
        data: {
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
        };
    }>;
}
