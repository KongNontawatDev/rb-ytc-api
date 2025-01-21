export declare const createShoppingTemplate: (data: {
    name: string;
    price: string;
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
            color?: undefined;
            wrap?: undefined;
        } | {
            type: string;
            text: string;
            size: string;
            color: string;
            wrap: boolean;
            weight?: undefined;
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
