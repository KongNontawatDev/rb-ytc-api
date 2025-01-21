import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from '@provider/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FindDepartmentsByConditionQueryDto, UpdateStatusDepartmentDto } from './dto/params-department.dto';
export declare class DepartmentService {
    private db;
    constructor(db: PrismaService);
    create(data: CreateDepartmentDto): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
    } | undefined>;
    findByCondition(query: FindDepartmentsByConditionQueryDto): Promise<{
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
        }[];
        pageCount: number;
        total: number;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
    }[] | undefined>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
    } | null | undefined>;
    findForDropdown(): Promise<{
        id: number;
        name: string;
    }[] | undefined>;
    update(id: number, data: UpdateDepartmentDto): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
    } | undefined>;
    updateStatusOne(id: number, data: UpdateStatusDepartmentDto): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
    } | undefined>;
    updateStatusMany(ids: number[], status: number): Promise<Prisma.BatchPayload | undefined>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
    } | undefined>;
    removeMany(id: number[]): Promise<Prisma.BatchPayload | undefined>;
}
