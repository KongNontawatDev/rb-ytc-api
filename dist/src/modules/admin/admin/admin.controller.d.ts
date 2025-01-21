import { AdminService } from './admin.service';
import { UpdateAdminDto, UpdateStatusAdminDto } from './dto/update-admin.dto';
import { FileService } from 'src/common/utils/file/file.service';
import { CreateAdminDto } from '@modules/admin/admin/dto/create-admin.dto';
import { FindAdminsByConditionQueryDto, FindOneAdminParamDto, DeleteManyAdminDto, UpdateManyAdminDto } from './dto/params-admin.dto';
export declare class AdminController {
    private readonly adminService;
    private readonly fileService;
    constructor(adminService: AdminService, fileService: FileService);
    create(body: CreateAdminDto, file: Express.Multer.File): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
            email: string;
            image: string | null;
            role_id: number;
        } | undefined;
    }>;
    findByCondition(query: FindAdminsByConditionQueryDto): Promise<{
        error: number;
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
            email: string;
            image: string | null;
            password: string;
            role_id: number;
            reset_token: string | null;
            reset_token_expiry: Date | null;
            refresh_token: string | null;
        }[] | undefined;
    }>;
    findOne(params: FindOneAdminParamDto): Promise<{
        message: string;
        error: number;
        data: {
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
        } | null | undefined;
    }>;
    update(id: string, body: UpdateAdminDto, file: Express.Multer.File): Promise<{
        message: string;
        error: number;
        data: {
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
            email: string;
            image: string | null;
            password: string;
            role_id: number;
            reset_token: string | null;
            reset_token_expiry: Date | null;
            refresh_token: string | null;
        } | undefined;
    }>;
    removeMany(body: DeleteManyAdminDto): Promise<{
        message: string;
        error: number;
        data: import(".prisma/client").Prisma.BatchPayload | undefined;
    }>;
    updateStatusOne(id: string, body: UpdateStatusAdminDto): Promise<{
        message: string;
        error: number;
        data: {
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
        } | undefined;
    }>;
    updateStatusMany(body: UpdateManyAdminDto): Promise<{
        message: string;
        error: number;
        data: import(".prisma/client").Prisma.BatchPayload | undefined;
    }>;
}
