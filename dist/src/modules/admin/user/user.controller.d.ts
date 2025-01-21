import { FileService } from 'src/common/utils/file/file.service';
import { UserService } from '@modules/core/user/user.service';
import { CreateUserDto } from '@modules/core/user/dto/create-user.dto';
import { DeleteManyUserDto, FindOneUserParamDto, FindUsersByConditionQueryDto, UpdateManyUserDto } from '@modules/core/user/dto/params-user.dto';
import { UpdateStatusUserDto, UpdateUserDto } from '@modules/core/user/dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    private readonly fileService;
    constructor(userService: UserService, fileService: FileService);
    create(body: CreateUserDto, file: Express.Multer.File): Promise<{
        message: string;
        error: number;
        data: {
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
        } | undefined;
    }>;
    findByCondition(query: FindUsersByConditionQueryDto): Promise<{
        error: number;
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
            created_at: Date;
            updated_at: Date;
            status: number;
            full_name: string;
            tel: string;
            line_name: string;
            line_id: string;
            department_id: number;
            image: string | null;
        }[] | undefined;
    }>;
    findOne(params: FindOneUserParamDto): Promise<{
        message: string;
        error: number;
        data: ({
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
        }) | null | undefined;
    }>;
    findForDropdown(): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            full_name: string;
            tel: string;
            department_id: number;
        }[] | undefined;
    }>;
    update(id: string, body: UpdateUserDto, file: Express.Multer.File): Promise<{
        message: string;
        error: number;
        data: {
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
        } | undefined;
    }>;
    remove(id: string): Promise<{
        message: string;
        error: number;
        data: {
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
        } | undefined;
    }>;
    removeMany(body: DeleteManyUserDto): Promise<{
        message: string;
        error: number;
        data: import(".prisma/client").Prisma.BatchPayload | undefined;
    }>;
    updateStatusOne(id: string, body: UpdateStatusUserDto): Promise<{
        message: string;
        error: number;
        data: {
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
        } | undefined;
    }>;
    updateStatusMany(body: UpdateManyUserDto): Promise<{
        message: string;
        error: number;
        data: import(".prisma/client").Prisma.BatchPayload | undefined;
    }>;
}
