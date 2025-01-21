export declare class LineMessagingService {
    private readonly axiosInstance;
    constructor();
    pushMessage(to: string, messages: any[]): Promise<any>;
    replyMessage(replyToken: string, messages: any[]): Promise<any>;
    createTemplateMessage(altText: string, template: Record<string, any>): Record<string, any>;
}
