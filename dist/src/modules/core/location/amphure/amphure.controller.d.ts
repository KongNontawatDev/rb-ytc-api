import { AmphureService } from './amphure.service';
import { CreateAmphureDto } from './dto/create-amphure.dto';
import { DeleteManyAmphureDto, UpdateAmphureDto } from './dto/update-amphure.dto';
import { FindOneAmphureParamDto, FindAmphuresByConditionQueryDto } from './dto/params-amphure.dto';
export declare class AmphureController {
    private readonly amphureService;
    constructor(amphureService: AmphureService);
    create(body: CreateAmphureDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            province_id: number;
        } | undefined;
    }>;
    findByCondition(query: FindAmphuresByConditionQueryDto): Promise<{
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
        province_id: number;
    }[] | undefined>;
    findOne(params: FindOneAmphureParamDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            province_id: number;
        } | null | undefined;
    }>;
    update(id: string, updateAmphureDto: UpdateAmphureDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            province_id: number;
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
            province_id: number;
        } | undefined;
    }>;
    removeMany(body: DeleteManyAmphureDto): Promise<{
        message: string;
        error: number;
        data: import(".prisma/client").Prisma.BatchPayload | undefined;
    }>;
}
