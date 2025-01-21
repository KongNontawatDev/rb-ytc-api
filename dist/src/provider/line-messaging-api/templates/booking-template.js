"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingTemplate = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const bookingTemplate = (context, booking, color) => [
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
                                text: `${(0, dayjs_1.default)(booking.book_start).tz('Asia/Bangkok').format('DD-MM-YYYY HH:mm')} - ${(0, dayjs_1.default)(booking.book_end).tz('Asia/Bangkok').format('DD-MM-YYYY HH:mm')}`,
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
exports.bookingTemplate = bookingTemplate;
//# sourceMappingURL=booking-template.js.map