import { CreateAmphureDto } from './dto/create-amphure.dto';
import { UpdateAmphureDto } from './dto/update-amphure.dto';
import { PrismaService } from '@provider/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FindAmphuresByConditionQueryDto } from './dto/params-amphure.dto';
export declare class AmphureService {
    private db;
    constructor(db: PrismaService);
    create(data: CreateAmphureDto): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        province_id: number;
    } | undefined>;
    findByCondition(query: FindAmphuresByConditionQueryDto): Promise<{
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            province_id: number;
        }[];
        pageCount: number;
        total: number;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        province_id: number;
    }[] | undefined>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        province_id: number;
    } | null | undefined>;
    findManyByProvinceId(province_id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        province_id: number;
    }[] | undefined>;
    update(id: number, data: UpdateAmphureDto): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        province_id: number;
    } | undefined>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        province_id: number;
    } | undefined>;
    removeMany(id: number[]): Promise<Prisma.BatchPayload | undefined>;
}
