import { BaseQueryDto } from '@common/dto/base.dto';
import {
  IsArrayField,
  IsDateField,
  IsInteger,
  IsNumberStringField,
  IsOptionalField,
  IsRequiredField,
  IsValidString,
} from '@common/validation/validation.decorator';
import { IsNumber } from 'class-validator';

export class FindBookingListsByConditionQueryDto extends BaseQueryDto {
  @IsOptionalField()
  @IsValidString()
  status?: string;

  @IsOptionalField()
  @IsDateField()
  book_start?: Date;

  @IsOptionalField()
  @IsDateField()
  book_end?: Date;

  @IsOptionalField()
  @IsNumberStringField()
  user_id?: string;

  @IsOptionalField()
  @IsNumberStringField()
  room_id?: string;
}

export class FindOneBookingListParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  id: string;
}

export class FindRoomBookingDateParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  room_id: string;
}
export class findManyBookingListByUserDto {
  @IsNumberStringField()
  @IsRequiredField()
  user_id: string;
}

export class findManyBookingListByRoomForCalendarAndTimelineParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  room_id: string;
}

export class findManyBookingListByUserForCalendarAndTimelineParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  user_id: string;
}

export class UpdateBookingListParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  id: string;
}

export class DeleteBookingListParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  id: string;
}

export class DeleteManyBookingListDto {
  @IsArrayField()
  @IsNumber({}, { each: true })
  id: number[];
}

export class UpdateManyBookingListDto {
  @IsArrayField()
  @IsNumber({}, { each: true })
  id: number[];

  @IsInteger()
  @IsRequiredField()
  status: number;
}
