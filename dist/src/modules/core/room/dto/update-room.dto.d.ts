import { CreateRoomDto } from './create-room.dto';
declare const UpdateRoomDto_base: import("@nestjs/common").Type<Partial<CreateRoomDto>>;
export declare class UpdateRoomDto extends UpdateRoomDto_base {
    id: number;
    status: number;
    removeImages?: string[];
    images?: Express.Multer.File[];
}
export declare class UpdateStatusRoomDto {
    status: number;
}
export {};
