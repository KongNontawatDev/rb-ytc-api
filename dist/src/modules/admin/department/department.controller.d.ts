import { DepartmentService } from '@modules/core/department/department.service';
import { CreateDepartmentDto } from '@modules/core/department/dto/create-department.dto';
import { DeleteManyDepartmentDto, FindDepartmentsByConditionQueryDto, FindOneDepartmentParamDto, UpdateManyDepartmentDto, UpdateStatusDepartmentDto } from '@modules/core/department/dto/params-department.dto';
import { UpdateDepartmentDto } from '@modules/core/department/dto/update-department.dto';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    create(body: CreateDepartmentDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
        } | undefined;
    }>;
    findByCondition(query: FindDepartmentsByConditionQueryDto): Promise<{
        error: number;
        data: any[] | undefined;
        meta?: {
            page: number;
            pageSize: number;
            pageCount: number | undefined;
            total: number | undefined;
        } | undefined;
        message: string;
    } | undefined>;
    findAll(): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
    }[] | undefined>;
    findOne(params: FindOneDepartmentParamDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
        } | null | undefined;
    }>;
    findForDropdown(): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
        }[] | undefined;
    }>;
    update(id: string, body: UpdateDepartmentDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
        } | undefined;
    }>;
    remove(id: string): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
        } | undefined;
    }>;
    removeMany(body: DeleteManyDepartmentDto): Promise<{
        message: string;
        error: number;
        data: import(".prisma/client").Prisma.BatchPayload | undefined;
    }>;
    updateStatusOne(id: string, body: UpdateStatusDepartmentDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
        } | undefined;
    }>;
    updateStatusMany(body: UpdateManyDepartmentDto): Promise<{
        message: string;
        error: number;
        data: import(".prisma/client").Prisma.BatchPayload | undefined;
    }>;
}
