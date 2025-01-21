import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { PrismaService } from '@provider/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FindDistrictsByConditionQueryDto } from './dto/params-district.dto';
export declare class DistrictService {
    private db;
    constructor(db: PrismaService);
    create(data: CreateDistrictDto): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        amphure_id: number;
        zip_code: string;
    } | undefined>;
    findByCondition(query: FindDistrictsByConditionQueryDto): Promise<{
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            amphure_id: number;
            zip_code: string;
        }[];
        pageCount: number;
        total: number;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        amphure_id: number;
        zip_code: string;
    }[] | undefined>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        amphure_id: number;
        zip_code: string;
    } | null | undefined>;
    update(id: number, data: UpdateDistrictDto): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        amphure_id: number;
        zip_code: string;
    } | undefined>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        amphure_id: number;
        zip_code: string;
    } | undefined>;
    removeMany(id: number[]): Promise<Prisma.BatchPayload | undefined>;
}
