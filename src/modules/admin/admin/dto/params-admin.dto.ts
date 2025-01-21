import { BaseQueryDto } from '@common/dto/base.dto';
import { IsArrayField, IsInteger, IsNumberStringField, IsOptionalField, IsRequiredField, IsValidString } from '@common/validation/validation.decorator';
import { IsNumber } from 'class-validator';

export class FindAdminsByConditionQueryDto extends BaseQueryDto {
  @IsOptionalField()
  @IsValidString()
  status?: string;

    @IsOptionalField()
  @IsValidString()
  role_id?: string;
}

export class FindOneAdminParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  id: string;
}

export class UpdateAdminParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  id: string;
} 

export class DeleteAdminParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  id: string;
} 

export class DeleteManyAdminDto {
  @IsArrayField()
  @IsNumber({}, { each: true })
  id: number[];
}

export class UpdateManyAdminDto {
  @IsArrayField()
  @IsNumber({}, { each: true })
  id: number[];

  @IsInteger('สถานะ')
  @IsRequiredField()
  status:number
}