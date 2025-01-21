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
    findRoomEmpty(): Promise<{
        message: string;
        error: number;
        data: ({
            booking_list: {
                id: number;
                created_at: Date;
                updated_at: Date;
                status: number;
                tel: string;
                department_id: number;
                title: string;
                user_id: number;
                room_id: number;
                booking_number: string;
                user_name: string;
                detail: string | null;
                book_start: Date;
                book_end: Date;
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
}
