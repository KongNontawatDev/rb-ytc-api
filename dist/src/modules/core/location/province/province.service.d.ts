import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { PrismaService } from '@provider/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FindProvincesByConditionQueryDto } from './dto/params-province.dto';
export declare class ProvinceService {
    private db;
    constructor(db: PrismaService);
    create(data: CreateProvinceDto): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    } | undefined>;
    findByCondition(query: FindProvincesByConditionQueryDto): Promise<{
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
        }[];
        pageCount: number;
        total: number;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }[] | undefined>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    } | null | undefined>;
    update(id: number, data: UpdateProvinceDto): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    } | undefined>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    } | undefined>;
    removeMany(id: number[]): Promise<Prisma.BatchPayload | undefined>;
}
