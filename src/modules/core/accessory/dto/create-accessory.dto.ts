import {
  IsOptionalField,
  IsRequiredField,
  IsValidString,
} from '@common/validation/validation.decorator';

export class CreateAccessoryDto {
  @IsValidString()
  @IsRequiredField()
  name: string;

  @IsValidString()
  @IsOptionalField()
  detail?: string;

  @IsOptionalField()
  image?: Express.Multer.File|string;
}
