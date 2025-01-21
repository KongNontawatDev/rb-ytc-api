import { amphure } from '@prisma/client';
export declare class AmphureDto implements amphure {
    id: number;
    province_id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}
