import { booking_list, room, user } from '@prisma/client';
import dayjs from 'dayjs';

export const bookingTemplate = (context: string, booking: booking_list&{room:Pick<room,"name">,user:Pick<user,"line_id">},color:string) => [
  {
    type: 'flex',
    altText: `แจ้งเตือนการ ${context}`,
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: context,
            weight: 'bold',
            size: 'xl',
            color: color
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: 'ห้อง',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1,
              },
              {
                type: 'text',
                text: booking.room.name,
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5,
              },
            ],
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: 'เรื่อง',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1,
              },
              {
                type: 'text',
                text: booking.title,
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5,
              },
            ],
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: 'จองวันที่',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1,
              },
              {
                type: 'text',
                text: `${dayjs(booking.book_start).tz('Asia/Bangkok').format('DD-MM-YYYY HH:mm')} - ${dayjs(booking.book_end).tz('Asia/Bangkok').format('DD-MM-YYYY HH:mm')}`,
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5,
              },
            ],
          },
        ],
      },
    },
  },
];
