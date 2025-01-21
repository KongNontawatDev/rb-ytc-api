import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import {
  IsInteger,
  IsOptionalField,
  IsRequiredField,
  IsValidString,
} from '@common/validation/validation.decorator';

export class UpdateAdminDto extends PartialType(
  OmitType(CreateAdminDto, ['image'] as const),
) {
  // ตรวจสอบว่าเป็นตัวเลขจำนวนเต็ม
  @IsInteger()
  @IsRequiredField()
  id: number;

  @IsInteger()
  @IsRequiredField()
  status: number;

  @IsOptionalField()
  @IsValidString()
  image?: string | Express.Multer.File | null;

  @IsOptionalField()
  password: string;
}

export class UpdateStatusAdminDto {
  @IsInteger()
  @IsRequiredField()
  status: number;
}

