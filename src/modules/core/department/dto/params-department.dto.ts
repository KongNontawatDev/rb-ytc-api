import { BaseQueryDto } from '@common/dto/base.dto';
import {
  IsArrayField,
  IsInteger,
  IsNumberStringField,
  IsOptionalField,
  IsRequiredField,
  IsValidString,
} from '@common/validation/validation.decorator';
import { IsNumber } from 'class-validator';

export class FindDepartmentsByConditionQueryDto extends BaseQueryDto {
  @IsOptionalField()
  @IsValidString()
  status?: string;
}

export class FindOneDepartmentParamDto {
  @IsNumberStringField()
  id: string;
}

export class UpdateDepartmentParamDto {
  @IsNumberStringField()
  id: string;
}

export class DeleteDepartmentParamDto {
  @IsNumberStringField()
  id: string;
}

export class DeleteManyDepartmentDto {
  @IsArrayField()
  @IsNumber({}, { each: true })
  id: number[];
}

export class UpdateManyDepartmentDto {
  @IsArrayField()
  @IsNumber({}, { each: true })
  id: number[];

  @IsInteger()
  @IsRequiredField()
  status: number;
}

export class UpdateStatusDepartmentDto {
  @IsInteger()
  @IsRequiredField()
  status: number;
}
