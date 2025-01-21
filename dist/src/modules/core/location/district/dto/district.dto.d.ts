import { district } from '@prisma/client';
export declare class DistrictDto implements district {
    id: number;
    amphure_id: number;
    name: string;
    zip_code: string;
    created_at: Date;
    updated_at: Date;
}
