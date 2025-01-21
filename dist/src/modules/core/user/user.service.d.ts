import { CreateUserDto } from './dto/create-user.dto';
import { UpdateStatusUserDto, UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FindUsersByConditionQueryDto } from './dto/params-user.dto';
import { FileService } from '@common/utils/file/file.service';
import { CompressionService } from '@common/utils/compression/compression.service';
export declare class UserService {
    private db;
    private fileService;
    private readonly compressionService;
    constructor(db: PrismaService, fileService: FileService, compressionService: CompressionService);
    create(data: CreateUserDto, file?: Express.Multer.File): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        status: number;
        full_name: string;
        tel: string;
        line_name: string;
        line_id: string;
        department_id: number;
        image: string | null;
    } | undefined>;
    findByCondition(query: FindUsersByConditionQueryDto): Promise<{
        data: ({
            department: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            created_at: Date;
            updated_at: Date;
            status: number;
            full_name: string;
            tel: string;
            line_name: string;
            line_id: string;
            department_id: number;
            image: string | null;
        })[];
        pageCount: number;
        total: number;
    }>;
    findAll(): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        status: number;
        full_name: string;
        tel: string;
        line_name: string;
        line_id: string;
        department_id: number;
        image: string | null;
    }[] | undefined>;
    findForDropdown(): Promise<{
        id: number;
        full_name: string;
        tel: string;
        department_id: number;
    }[] | undefined>;
    findOne(id: number): Promise<({
        booking_list: {
            room: {
                name: string;
            };
            title: string;
            book_start: Date;
            book_end: Date;
        }[];
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        status: number;
        full_name: string;
        tel: string;
        line_name: string;
        line_id: string;
        department_id: number;
        image: string | null;
    }) | null | undefined>;
    update(id: number, data: UpdateUserDto, file?: Express.Multer.File): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        status: number;
        full_name: string;
        tel: string;
        line_name: string;
        line_id: string;
        department_id: number;
        image: string | null;
    } | undefined>;
    updateStatusMany(ids: number[], status: number): Promise<Prisma.BatchPayload | undefined>;
    updateStatusOne(id: number, data: UpdateStatusUserDto): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        status: number;
        full_name: string;
        tel: string;
        line_name: string;
        line_id: string;
        department_id: number;
        image: string | null;
    } | undefined>;
    remove(id: number): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        status: number;
        full_name: string;
        tel: string;
        line_name: string;
        line_id: string;
        department_id: number;
        image: string | null;
    } | undefined>;
    removeMany(id: number[]): Promise<Prisma.BatchPayload | undefined>;
}
