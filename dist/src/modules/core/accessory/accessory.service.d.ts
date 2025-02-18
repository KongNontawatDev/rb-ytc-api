import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto, UpdateStatusAccessoryDto } from './dto/update-accessory.dto';
import { FindAccessorysByConditionQueryDto } from './dto/params-accessory.dto';
import { FileService } from '@common/utils/file/file.service';
import { PrismaService } from '@provider/prisma/prisma.service';
import { CompressionService } from '@common/utils/compression/compression.service';
export declare class AccessoryService {
    private db;
    private fileService;
    private readonly compressionService;
    constructor(db: PrismaService, fileService: FileService, compressionService: CompressionService);
    create(data: CreateAccessoryDto, file?: Express.Multer.File): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
        image: string;
        detail: string | null;
    } | undefined>;
    findByCondition(query: FindAccessorysByConditionQueryDto): Promise<{
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
            image: string;
            detail: string | null;
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
        image: string;
        detail: string | null;
    }[] | undefined>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
        image: string;
        detail: string | null;
    } | null | undefined>;
    findForDropdown(): Promise<{
        id: number;
        name: string;
        image: string;
    }[] | undefined>;
    update(id: number, data: UpdateAccessoryDto, file?: Express.Multer.File): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
        image: string;
        detail: string | null;
    } | undefined>;
    updateStatusOne(id: number, data: UpdateStatusAccessoryDto): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
        image: string;
        detail: string | null;
    } | undefined>;
    updateStatusMany(id: number[], status: number): Promise<{
        count: number;
    } | undefined>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
        image: string;
        detail: string | null;
    } | undefined>;
    removeMany(id: number[]): Promise<{
        count: number;
    } | undefined>;
}
