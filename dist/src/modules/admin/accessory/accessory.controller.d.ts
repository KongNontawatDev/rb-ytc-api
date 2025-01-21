import { FileService } from 'src/common/utils/file/file.service';
import { CreateAccessoryDto } from '@modules/core/accessory/dto/create-accessory.dto';
import { AccessoryService } from '@modules/core/accessory/accessory.service';
import { DeleteManyAccessoryDto, FindAccessorysByConditionQueryDto, FindOneAccessoryParamDto, UpdateManyAccessoryDto } from '@modules/core/accessory/dto/params-accessory.dto';
import { UpdateAccessoryDto, UpdateStatusAccessoryDto } from '@modules/core/accessory/dto/update-accessory.dto';
export declare class AccessoryController {
    private readonly accessoryService;
    private readonly fileService;
    constructor(accessoryService: AccessoryService, fileService: FileService);
    create(body: CreateAccessoryDto, file: Express.Multer.File): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
            image: string;
            detail: string | null;
        } | undefined;
    }>;
    findByCondition(query: FindAccessorysByConditionQueryDto): Promise<{
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
            image: string;
            detail: string | null;
        }[];
        meta: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
        message: string;
    }>;
    findAll(): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
            image: string;
            detail: string | null;
        }[] | undefined;
    }>;
    findOne(params: FindOneAccessoryParamDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
            image: string;
            detail: string | null;
        } | null | undefined;
    }>;
    findForDropdown(): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            image: string;
        }[] | undefined;
    }>;
    update(id: string, body: UpdateAccessoryDto, file: Express.Multer.File): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
            image: string;
            detail: string | null;
        } | undefined;
    }>;
    updateStatusOne(id: string, body: UpdateStatusAccessoryDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
            image: string;
            detail: string | null;
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
            image: string;
            detail: string | null;
        } | undefined;
    }>;
    removeMany(body: DeleteManyAccessoryDto): Promise<{
        message: string;
        error: number;
        data: import(".prisma/client").Prisma.BatchPayload | undefined;
    }>;
    updateStatusMany(body: UpdateManyAccessoryDto): Promise<{
        message: string;
        error: number;
        data: import(".prisma/client").Prisma.BatchPayload | undefined;
    }>;
}
