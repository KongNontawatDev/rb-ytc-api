import {  OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {  IsInteger, IsNumberStringField, IsOptionalField, IsRequiredField, IsValidString } from '@common/validation/validation.decorator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['image'] as const),
)  {
  // ตรวจสอบว่าเป็นตัวเลขจำนวนเต็ม
  @IsInteger()
  @IsRequiredField()
  id: number;

  @IsInteger()
  @IsRequiredField()
  status: number;

  @IsOptionalField()
  image?: string | Express.Multer.File|null;
}

export class UpdateStatusUserDto {
  @IsInteger()
  @IsRequiredField()
  status: number;
}
