import { BaseQueryDto } from '@common/dto/base.dto';
import { IsArrayField, IsInteger, IsNumberStringField, IsOptionalField, IsRequiredField, IsValidString } from '@common/validation/validation.decorator';
import { IsNumber } from 'class-validator';

export class FindAccessorysByConditionQueryDto extends BaseQueryDto {
  @IsOptionalField()
  @IsValidString()
  status?: string;
}

export class FindOneAccessoryParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  id: string;
}

export class UpdateAccessoryParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  id: string;
} 

export class DeleteAccessoryParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  id: string;
} 

export class DeleteManyAccessoryDto {
  @IsArrayField()
  @IsNumber({}, { each: true })
  id: number[];
}

export class UpdateManyAccessoryDto {
  @IsArrayField()
  @IsNumber({}, { each: true })
  id: number[];

  @IsInteger('สถานะ')
  @IsRequiredField()
  status:number
}