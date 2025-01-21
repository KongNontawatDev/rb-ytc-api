export declare const createRestaurantTemplate: (data: {
    title: string;
    rating: number;
    address: string;
    imageUrl: string;
    link: string;
}) => {
    type: string;
    hero: {
        type: string;
        url: string;
        size: string;
        aspectRatio: string;
        aspectMode: string;
    };
    body: {
        type: string;
        layout: string;
        contents: ({
            type: string;
            text: string;
            weight: string;
            size: string;
            layout?: undefined;
            margin?: undefined;
            contents?: undefined;
            color?: undefined;
            wrap?: undefined;
        } | {
            type: string;
            layout: string;
            margin: string;
            contents: ({
                type: string;
                url: string;
                text?: undefined;
                size?: undefined;
                color?: undefined;
            } | {
                type: string;
                text: string;
                size: string;
                color: string;
                url?: undefined;
            })[];
            text?: undefined;
            weight?: undefined;
            size?: undefined;
            color?: undefined;
            wrap?: undefined;
        } | {
            type: string;
            text: string;
            size: string;
            color: string;
            wrap: boolean;
            weight?: undefined;
            layout?: undefined;
            margin?: undefined;
            contents?: undefined;
        })[];
    };
    footer: {
        type: string;
        layout: string;
        contents: {
            type: string;
            style: string;
            height: string;
            action: {
                type: string;
                label: string;
                uri: string;
            };
        }[];
    };
};
