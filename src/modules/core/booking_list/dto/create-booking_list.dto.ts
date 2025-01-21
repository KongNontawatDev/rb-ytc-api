import {
  IsDateField,
  IsInteger,
  IsOptionalField,
  IsPhoneNumberField,
  IsRequiredField,
  IsValidString,
} from 'src/common/validation/validation.decorator';

export class CreateBookingListDto {
  @IsInteger()
  @IsRequiredField()
  user_id: number;

  @IsInteger()
  @IsRequiredField()
  room_id: number;

  @IsInteger()
  @IsRequiredField()
  department_id: number;

  @IsPhoneNumberField()
  @IsRequiredField()
  tel: string;

  @IsValidString()
  @IsRequiredField()
  user_name: string;

  @IsValidString()
  @IsRequiredField()
  title: string;

  @IsValidString()
  @IsOptionalField()
  detail: string;

  @IsDateField()
  @IsRequiredField()
  book_start: Date;

  @IsDateField()
  @IsRequiredField()
  book_end: Date;
}
