import { province } from '@prisma/client';
export declare class ProvinceDto implements province {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}
