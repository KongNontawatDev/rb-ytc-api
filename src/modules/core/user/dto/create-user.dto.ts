import {
  IsInteger,
  IsOptionalField,
  IsPhoneNumberField,
  IsRequiredField,
  IsValidString,
} from 'src/common/validation/validation.decorator';

export class CreateUserDto{
  @IsValidString()
  @IsRequiredField()
  full_name: string;

  @IsPhoneNumberField()
  @IsRequiredField()
  tel: string;

  @IsValidString()
  @IsOptionalField()
  line_name: string;

  @IsValidString()
  @IsOptionalField()
  line_id: string;

  @IsInteger()
  @IsRequiredField()
  department_id:number

  @IsOptionalField()
  image: Express.Multer.File|string;
}
