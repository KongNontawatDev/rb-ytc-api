import {
  IsArrayField,
  IsOptionalField,
  IsRequiredField,
  IsValidString,
} from '@common/validation/validation.decorator';
import { Type } from 'class-transformer';
import { IsNumber, Min, Max, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsValidString()
  @IsRequiredField()
  name: string;

  @IsValidString()
  @IsOptionalField()
  detail: string;

  @IsValidString()
  @IsRequiredField()
  location: string;

  @IsValidString()
  @IsRequiredField()
  size: string;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(9999)
  @IsRequiredField()
  capacity: number;

  @IsOptionalField()
  @IsValidString()
  accessorys: string;

  @IsOptionalField()
  @IsArrayField()
  images?: Express.Multer.File[];
}