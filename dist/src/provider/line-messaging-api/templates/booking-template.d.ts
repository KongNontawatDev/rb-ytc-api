import { DateService } from '@common/utils/date/date.service';
import { booking_list, room, user } from '@prisma/client';
export declare const bookingTemplate: (context: string, booking: booking_list & {
    room: Pick<room, "name">;
    user: Pick<user, "line_id">;
}, color: string, dateService: DateService) => {
    type: string;
    altText: string;
    contents: {
        type: string;
        body: {
            type: string;
            layout: string;
            contents: ({
                type: string;
                text: string;
                weight: string;
                size: string;
                color: string;
                layout?: undefined;
                spacing?: undefined;
                contents?: undefined;
            } | {
                type: string;
                layout: string;
                spacing: string;
                contents: ({
                    type: string;
                    text: string;
                    color: string;
                    size: string;
                    flex: number;
                    wrap?: undefined;
                } | {
                    type: string;
                    text: string;
                    wrap: boolean;
                    color: string;
                    size: string;
                    flex: number;
                })[];
                text?: undefined;
                weight?: undefined;
                size?: undefined;
                color?: undefined;
            })[];
        };
    };
}[];
