import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto, UpdateStatusRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FindRoomsByConditionQueryDto } from './dto/params-room.dto';
import { FileService } from '@common/utils/file/file.service';
import { CompressionService } from '@common/utils/compression/compression.service';
export declare class RoomService {
    private db;
    private fileService;
    private readonly compressionService;
    constructor(db: PrismaService, fileService: FileService, compressionService: CompressionService);
    create(data: CreateRoomDto, files: Express.Multer.File[]): Promise<({
        room_accessory: ({
            accessory: {
                id: number;
                name: string;
                detail: string | null;
                status: number;
                created_at: Date;
                updated_at: Date;
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
    }) | undefined>;
    update(id: number, data: UpdateRoomDto, files: Express.Multer.File[]): Promise<({
        room_accessory: ({
            accessory: {
                id: number;
                name: string;
                detail: string | null;
                status: number;
                created_at: Date;
                updated_at: Date;
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
    }) | undefined>;
    findByCondition(query: FindRoomsByConditionQueryDto): Promise<{
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
        pageCount: number;
        total: number;
    }>;
    findAll(): Promise<({
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
    })[] | undefined>;
    findRoomEmpty(): Promise<({
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
    })[] | undefined>;
    findOne(id: number): Promise<({
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
    }) | null | undefined>;
    findForDropdown(): Promise<{
        id: number;
        name: string;
    }[] | undefined>;
    updateStatusMany(ids: number[], status: number): Promise<Prisma.BatchPayload | undefined>;
    updateStatusOne(id: number, data: UpdateStatusRoomDto): Promise<{
        id: number;
        name: string;
        detail: string | null;
        location: string;
        size: string;
        capacity: string;
        status: number;
        created_at: Date;
        updated_at: Date;
    } | undefined>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        detail: string | null;
        location: string;
        size: string;
        capacity: string;
        status: number;
        created_at: Date;
        updated_at: Date;
    } | undefined>;
    removeMany(ids: number[]): Promise<Prisma.BatchPayload | undefined>;
}
