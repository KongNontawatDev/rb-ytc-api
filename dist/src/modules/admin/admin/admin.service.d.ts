import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto, UpdateStatusAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FindAdminsByConditionQueryDto } from './dto/params-admin.dto';
import { FileService } from '@common/utils/file/file.service';
import { CompressionService } from '@common/utils/compression/compression.service';
import { AuthService } from '../auth/auth.service';
export declare class AdminService {
    private db;
    private fileService;
    private readonly compressionService;
    private readonly authService;
    constructor(db: PrismaService, fileService: FileService, compressionService: CompressionService, authService: AuthService);
    create(data: CreateAdminDto, file?: Express.Multer.File): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
        email: string;
        image: string | null;
        role_id: number;
    } | undefined>;
    findByCondition(query: FindAdminsByConditionQueryDto): Promise<{
        data: ({
            role: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
            email: string;
            image: string | null;
            password: string;
            role_id: number;
            reset_token: string | null;
            reset_token_expiry: Date | null;
            refresh_token: string | null;
        })[];
        pageCount: number;
        total: number;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
        email: string;
        image: string | null;
        password: string;
        role_id: number;
        reset_token: string | null;
        reset_token_expiry: Date | null;
        refresh_token: string | null;
    }[] | undefined>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
        email: string;
        image: string | null;
        password: string;
        role_id: number;
        reset_token: string | null;
        reset_token_expiry: Date | null;
        refresh_token: string | null;
    } | null | undefined>;
    update(id: number, data: UpdateAdminDto, file?: Express.Multer.File): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
        email: string;
        image: string | null;
        password: string;
        role_id: number;
        reset_token: string | null;
        reset_token_expiry: Date | null;
        refresh_token: string | null;
    } | undefined>;
    updateStatusMany(ids: number[], status: number): Promise<Prisma.BatchPayload | undefined>;
    updateStatusOne(id: number, data: UpdateStatusAdminDto): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
        email: string;
        image: string | null;
        password: string;
        role_id: number;
        reset_token: string | null;
        reset_token_expiry: Date | null;
        refresh_token: string | null;
    } | undefined>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        status: number;
        email: string;
        image: string | null;
        password: string;
        role_id: number;
        reset_token: string | null;
        reset_token_expiry: Date | null;
        refresh_token: string | null;
    } | undefined>;
    removeMany(id: number[]): Promise<Prisma.BatchPayload | undefined>;
}
