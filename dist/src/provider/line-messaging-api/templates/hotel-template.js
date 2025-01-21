"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHotelTemplate = void 0;
const createHotelTemplate = () => [
    {
        type: 'flex',
        altText: 'This is a Flex Message',
        contents: {
            type: 'bubble',
            body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                    {
                        type: 'text',
                        text: 'test',
                        weight: 'bold',
                        size: 'xl',
                    },
                    {
                        type: 'text',
                        text: 'test',
                        size: 'sm',
                        color: '#999999',
                        wrap: true,
                    },
                ],
            },
        },
    },
];
exports.createHotelTemplate = createHotelTemplate;
//# sourceMappingURL=hotel-template.js.map