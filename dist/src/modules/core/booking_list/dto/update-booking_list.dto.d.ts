import { CreateBookingListDto } from './create-booking_list.dto';
declare const UpdateBookingListDto_base: import("@nestjs/common").Type<Partial<CreateBookingListDto>>;
export declare class UpdateBookingListDto extends UpdateBookingListDto_base {
    id: number;
    status: number;
}
export declare class UpdateStatusBookingListDto {
    status: number;
}
export {};
