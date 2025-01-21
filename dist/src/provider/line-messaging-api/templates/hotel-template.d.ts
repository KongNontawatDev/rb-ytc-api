export declare const createHotelTemplate: () => {
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
    };
}[];
