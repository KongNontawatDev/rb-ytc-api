import { PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';
import { 
  IsArrayField, 
  IsInteger, 
  IsOptionalField, 
  IsRequiredField,
} from '@common/validation/validation.decorator';
import { IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @IsInteger()
  @Type(() => Number)
  id: number;

  @IsInteger()
  @IsRequiredField()
  @Type(() => Number)
  @Min(1)
  @Max(2)
  status: number;

  @IsOptionalField()
  @IsArrayField()
  @IsString({ each: true })
  removeImages?: string[];

  @IsOptionalField()
  @IsArrayField()
  images?: Express.Multer.File[];
}

export class UpdateStatusRoomDto {
  @IsInteger()
  @IsRequiredField()
  status: number;
}
