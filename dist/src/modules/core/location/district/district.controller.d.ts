import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { DeleteManyDistrictDto, UpdateDistrictDto } from './dto/update-district.dto';
import { FindOneDistrictParamDto, FindDistrictsByConditionQueryDto } from './dto/params-district.dto';
export declare class DistrictController {
    private readonly districtService;
    constructor(districtService: DistrictService);
    create(body: CreateDistrictDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            amphure_id: number;
            zip_code: string;
        } | undefined;
    }>;
    findByCondition(query: FindDistrictsByConditionQueryDto): Promise<{
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
        amphure_id: number;
        zip_code: string;
    }[] | undefined>;
    findOne(params: FindOneDistrictParamDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            amphure_id: number;
            zip_code: string;
        } | null | undefined;
    }>;
    update(id: string, updateDistrictDto: UpdateDistrictDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            amphure_id: number;
            zip_code: string;
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
            amphure_id: number;
            zip_code: string;
        } | undefined;
    }>;
    removeMany(body: DeleteManyDistrictDto): Promise<{
        message: string;
        error: number;
        data: import(".prisma/client").Prisma.BatchPayload | undefined;
    }>;
}
