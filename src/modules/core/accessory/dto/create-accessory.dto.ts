import { BaseDto } from 'src/common/dto/base.dto';
import {
  IsInteger,
  IsOptionalField,
  IsPhoneNumberField,
  IsRequiredField,
  IsValidString,
} from 'src/common/validation/validation.decorator';

export class CreateAccessoryDto {
  @IsValidString()
  @IsRequiredField()
  name: string;

  @IsValidString()
  @IsOptionalField()
  detail: string;

  @IsOptionalField()
  image: Express.Multer.File|string;
}
