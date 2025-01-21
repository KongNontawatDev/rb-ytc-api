import { department } from '@prisma/client';
export declare class DepartmentDto implements department {
    id: number;
    name: string;
    status: number;
    created_at: Date;
    updated_at: Date;
}
