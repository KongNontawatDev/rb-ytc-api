import { PartialType } from '@nestjs/swagger';
import {
  IsInteger,
  IsRequiredField,
} from '@common/validation/validation.decorator';
import { CreateBookingListDto } from './create-booking_list.dto';

export class UpdateBookingListDto extends PartialType(CreateBookingListDto) {
  // ตรวจสอบว่าเป็นตัวเลขจำนวนเต็ม
  @IsInteger()
  @IsRequiredField()
  id: number;

  @IsInteger()
  @IsRequiredField()
  status: number;
}

export class UpdateStatusBookingListDto {
  @IsInteger()
  @IsRequiredField()
  status: number;
}
