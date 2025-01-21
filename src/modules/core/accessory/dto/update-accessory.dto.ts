import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateAccessoryDto } from './create-accessory.dto';
import { IsInteger, IsOptionalField, IsRequiredField } from '@common/validation/validation.decorator';

export class UpdateAccessoryDto extends PartialType(
  OmitType(CreateAccessoryDto, ['image'] as const),
)  {
  // ตรวจสอบว่าเป็นตัวเลขจำนวนเต็ม
  @IsInteger()
  id: number;

  @IsInteger()
  status:number

  @IsOptionalField()
  image?: string | Express.Multer.File|null;
}

export class UpdateStatusAccessoryDto {
  @IsInteger()
  @IsRequiredField()
  status: number;
}
