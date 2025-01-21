export declare class SmsService {
    private readonly axiosInstance;
    constructor();
    sendSms(to: string, message: string): Promise<any>;
}
