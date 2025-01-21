import { BaseQueryDto } from '@common/dto/base.dto';
import { IsArrayField, IsInteger, IsNumberStringField, IsOptionalField, IsRequiredField, IsValidString } from '@common/validation/validation.decorator';
import { IsNumber } from 'class-validator';

export class FindUsersByConditionQueryDto extends BaseQueryDto {
  @IsOptionalField()
  @IsValidString()
  status?: string;

    @IsOptionalField()
  @IsValidString()
  department_id?: string;
}

export class FindOneUserParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  id: string;
}

export class UpdateUserParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  id: string;
} 

export class DeleteUserParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  id: string;
} 

export class DeleteManyUserDto {
  @IsArrayField()
  @IsNumber({}, { each: true })
  id: number[];
}

export class UpdateManyUserDto {
  @IsArrayField()
  @IsNumber({}, { each: true })
  id: number[];

  @IsInteger()
  @IsRequiredField()
  status:number
}