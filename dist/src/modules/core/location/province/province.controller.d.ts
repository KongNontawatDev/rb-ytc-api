import { ProvinceService } from './province.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { DeleteManyProvinceDto, UpdateProvinceDto } from './dto/update-province.dto';
import { FindOneProvinceParamDto, FindProvincesByConditionQueryDto } from './dto/params-province.dto';
export declare class ProvinceController {
    private readonly provinceService;
    constructor(provinceService: ProvinceService);
    create(body: CreateProvinceDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
        } | undefined;
    }>;
    findByCondition(query: FindProvincesByConditionQueryDto): Promise<{
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
    }[] | undefined>;
    findOne(params: FindOneProvinceParamDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
        } | null | undefined;
    }>;
    update(id: string, updateProvinceDto: UpdateProvinceDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
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
        } | undefined;
    }>;
    removeMany(body: DeleteManyProvinceDto): Promise<{
        message: string;
        error: number;
        data: import(".prisma/client").Prisma.BatchPayload | undefined;
    }>;
}
