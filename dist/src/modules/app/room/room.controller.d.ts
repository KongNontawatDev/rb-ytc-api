import { RoomService } from '@modules/core/room/room.service';
import { FindOneRoomParamDto, FindRoomsByConditionQueryDto } from '@modules/core/room/dto/params-room.dto';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    findByCondition(query: FindRoomsByConditionQueryDto): Promise<{
        error: number;
        data: ({
            room_accessory: {
                id: number;
            }[];
            room_image: {
                id: number;
                room_id: number;
                image: string;
            }[];
        } & {
            id: number;
            name: string;
            detail: string | null;
            location: string;
            size: string;
            capacity: string;
            status: number;
            created_at: Date;
            updated_at: Date;
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
                room_id: number;
                image: string;
            }[];
        } & {
            id: number;
            name: string;
            detail: string | null;
            location: string;
            size: string;
            capacity: string;
            status: number;
            created_at: Date;
            updated_at: Date;
        })[] | undefined;
    }>;
    findRoomEmpty(): Promise<{
        message: string;
        error: number;
        data: ({
            booking_list: {
                id: number;
                detail: string | null;
                status: number;
                created_at: Date;
                updated_at: Date;
                room_id: number;
                department_id: number;
                user_id: number;
                booking_number: string;
                tel: string;
                user_name: string;
                title: string;
                book_start: Date;
                book_end: Date;
            }[];
            room_image: {
                id: number;
                room_id: number;
                image: string;
            }[];
        } & {
            id: number;
            name: string;
            detail: string | null;
            location: string;
            size: string;
            capacity: string;
            status: number;
            created_at: Date;
            updated_at: Date;
        })[] | undefined;
    }>;
    findOne(params: FindOneRoomParamDto): Promise<{
        message: string;
        error: number;
        data: ({
            booking_list: {
                id: number;
                department_id: number;
                user_id: number;
                user_name: string;
                title: string;
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
                room_id: number;
                image: string;
            }[];
        } & {
            id: number;
            name: string;
            detail: string | null;
            location: string;
            size: string;
            capacity: string;
            status: number;
            created_at: Date;
            updated_at: Date;
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
}
