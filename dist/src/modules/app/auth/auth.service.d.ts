import { PrismaService } from '@provider/prisma/prisma.service';
export declare class AuthService {
    private readonly db;
    constructor(db: PrismaService);
    checkRegister(line_id: string): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        status: number;
        full_name: string;
        tel: string;
        line_name: string;
        line_id: string;
        department_id: number;
        image: string | null;
    } | null>;
}
