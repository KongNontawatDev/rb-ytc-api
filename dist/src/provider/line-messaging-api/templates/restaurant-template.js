"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRestaurantTemplate = void 0;
const createRestaurantTemplate = (data) => ({
    type: 'bubble',
    hero: {
        type: 'image',
        url: data.imageUrl,
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
    },
    body: {
        type: 'box',
        layout: 'vertical',
        contents: [
            {
                type: 'text',
                text: data.title,
                weight: 'bold',
                size: 'xl',
            },
            {
                type: 'box',
                layout: 'baseline',
                margin: 'md',
                contents: [
                    {
                        type: 'icon',
                        url: 'https://example.com/star.png',
                    },
                    {
                        type: 'text',
                        text: data.rating.toFixed(1),
                        size: 'sm',
                        color: '#999999',
                    },
                ],
            },
            {
                type: 'text',
                text: data.address,
                size: 'sm',
                color: '#999999',
                wrap: true,
            },
        ],
    },
    footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
            {
                type: 'button',
                style: 'link',
                height: 'sm',
                action: {
                    type: 'uri',
                    label: 'View Details',
                    uri: data.link,
                },
            },
        ],
    },
});
exports.createRestaurantTemplate = createRestaurantTemplate;
//# sourceMappingURL=restaurant-template.js.map