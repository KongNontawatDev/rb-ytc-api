import {
  IsInteger,
  IsOptionalField,
  IsPassword,
  IsRequiredField,
  IsValidEmail,
  IsValidString,
} from 'src/common/validation/validation.decorator';

export class CreateAdminDto {

  @IsValidString()
  @IsRequiredField()
  name: string;

  @IsValidEmail()
  @IsRequiredField()
  email: string;

  @IsPassword(8,20)
  @IsRequiredField()
  password: string;

  @IsInteger()
  @IsRequiredField()
  role_id:number

  // @IsRequiredImage('โปรไฟล์')
  @IsOptionalField()
  image: Express.Multer.File|string;
}
