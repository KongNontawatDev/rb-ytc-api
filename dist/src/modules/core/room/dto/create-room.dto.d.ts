export declare class CreateRoomDto {
    name: string;
    detail: string;
    location: string;
    size: string;
    capacity: number;
    accessorys: string;
    images?: Express.Multer.File[];
}
