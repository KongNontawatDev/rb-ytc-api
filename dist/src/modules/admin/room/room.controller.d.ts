import { FileService } from 'src/common/utils/file/file.service';
import { RoomService } from '@modules/core/room/room.service';
import { CreateRoomDto } from '@modules/core/room/dto/create-room.dto';
import { UpdateRoomDto, UpdateStatusRoomDto } from '@modules/core/room/dto/update-room.dto';
import { DeleteManyRoomDto, FindOneRoomParamDto, FindRoomsByConditionQueryDto, UpdateManyRoomDto } from '@modules/core/room/dto/params-room.dto';
export declare class RoomController {
    private readonly roomService;
    private readonly fileService;
    constructor(roomService: RoomService, fileService: FileService);
    create(body: CreateRoomDto, files: Express.Multer.File[]): Promise<{
        message: string;
        error: number;
        data: ({
            room_accessory: ({
                accessory: {
                    id: number;
                    name: string;
                    created_at: Date;
                    updated_at: Date;
                    status: number;
                    image: string;
                    detail: string | null;
                };
            } & {
                id: number;
                room_id: number;
                accessory_id: number;
            })[];
            room_image: {
                id: number;
                image: string;
                room_id: number;
            }[];
        } & {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
            size: string;
            detail: string | null;
            location: string;
            capacity: string;
        }) | undefined;
    }>;
    update(id: string, body: UpdateRoomDto, files: Express.Multer.File[]): Promise<{
        message: string;
        error: number;
        data: ({
            room_accessory: ({
                accessory: {
                    id: number;
                    name: string;
                    created_at: Date;
                    updated_at: Date;
                    status: number;
                    image: string;
                    detail: string | null;
                };
            } & {
                id: number;
                room_id: number;
                accessory_id: number;
            })[];
            room_image: {
                id: number;
                image: string;
                room_id: number;
            }[];
        } & {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
            size: string;
            detail: string | null;
            location: string;
            capacity: string;
        }) | undefined;
    }>;
    findByCondition(query: FindRoomsByConditionQueryDto): Promise<{
        error: number;
        data: ({
            room_accessory: {
                id: number;
            }[];
            room_image: {
                id: number;
                image: string;
                room_id: number;
            }[];
        } & {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
            size: string;
            detail: string | null;
            location: string;
            capacity: string;
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
        data: ({
            room_image: {
                id: number;
                image: string;
                room_id: number;
            }[];
        } & {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
            size: string;
            detail: string | null;
            location: string;
            capacity: string;
        })[] | undefined;
    }>;
    findOne(params: FindOneRoomParamDto): Promise<{
        message: string;
        error: number;
        data: ({
            booking_list: {
                id: number;
                department_id: number;
                title: string;
                user_id: number;
                user_name: string;
                book_start: Date;
                book_end: Date;
            }[];
            room_accessory: ({
                accessory: {
                    id: number;
                    name: string;
                    image: string;
                };
            } & {
                id: number;
                room_id: number;
                accessory_id: number;
            })[];
            room_image: {
                id: number;
                image: string;
                room_id: number;
            }[];
        } & {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
            size: string;
            detail: string | null;
            location: string;
            capacity: string;
        }) | null | undefined;
    }>;
    findForDropdown(): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
        }[] | undefined;
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
            size: string;
            detail: string | null;
            location: string;
            capacity: string;
        } | undefined;
    }>;
    removeMany(body: DeleteManyRoomDto): Promise<{
        message: string;
        error: number;
        data: import(".prisma/client").Prisma.BatchPayload | undefined;
    }>;
    updateStatusMany(body: UpdateManyRoomDto): Promise<{
        message: string;
        error: number;
        data: import(".prisma/client").Prisma.BatchPayload | undefined;
    }>;
    updateStatusOne(id: string, body: UpdateStatusRoomDto): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
            status: number;
            size: string;
            detail: string | null;
            location: string;
            capacity: string;
        } | undefined;
    }>;
}
