import { ConfigService } from '@nestjs/config';
export declare class MailerService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendPasswordResetEmail(email: string, token: string): Promise<void>;
    sendLoginEmail(email: string, token: string): Promise<void>;
}
