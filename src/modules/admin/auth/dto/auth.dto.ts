import { BaseDto } from '@common/dto/base.dto';
import {
  IsInteger,
  IsPassword,
  IsRequiredField,
  IsValidEmail,
  IsValidString,
} from '@common/validation/validation.decorator';

export class SignInDto {
  @IsValidEmail()
  @IsRequiredField()
  email: string;

  @IsValidString()
  @IsRequiredField('รหัสผ่าน')
  password: string;
}

export class SignUpDto {
  @IsValidEmail()
  @IsRequiredField()
  email: string;

  @IsValidString()
  @IsRequiredField()
  name: string;

  @IsInteger()
  @IsRequiredField()
  role_id: number;

  @IsPassword(8, 20)
  @IsRequiredField()
  password: string;
}

export class ForgotPasswordDto {
  @IsValidEmail()
  @IsRequiredField()
  email: string;
}

export class ResetPasswordDto {
  @IsValidString()
  @IsRequiredField()
  token: string;

  @IsPassword(8, 20)
  @IsRequiredField()
  newPassword: string;
}
export class ChangePasswordFromOwnerDto {
  @IsValidString()
  @IsRequiredField()
  currentPassword: string;

  @IsPassword(8, 20)
  @IsRequiredField()
  newPassword: string;
}

export class  ChangePasswordFromOtherDto{
  @IsInteger()
  @IsRequiredField()
  id: number;

  @IsValidString()
  @IsRequiredField()
  currentPassword: string;

  @IsPassword(8, 20)
  @IsRequiredField()
  newPassword: string;
}
