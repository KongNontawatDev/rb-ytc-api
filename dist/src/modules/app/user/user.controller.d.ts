import { UserService } from '@modules/core/user/user.service';
import { FindOneUserParamDto } from '@modules/core/user/dto/params-user.dto';
import { UpdateUserDto } from '@modules/core/user/dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
}
