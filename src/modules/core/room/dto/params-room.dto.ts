import { BaseQueryDto } from '@common/dto/base.dto';
import { IsArrayField, IsInteger, IsNumberStringField, IsOptionalField, IsRequiredField, IsValidString } from '@common/validation/validation.decorator';
import { IsNumber } from 'class-validator';

export class FindRoomsByConditionQueryDto extends BaseQueryDto {
  @IsOptionalField()
  @IsValidString()
  status?: string;
}

export class FindOneRoomParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  id: string;
}

export class UpdateRoomParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  id: string;
} 

export class DeleteRoomParamDto {
  @IsNumberStringField()
  @IsRequiredField()
  id: string;
} 

export class DeleteManyRoomDto {
  @IsArrayField()
  @IsNumber({}, { each: true })
  id: number[];
}

export class UpdateManyRoomDto {
  @IsArrayField()
  @IsNumber({}, { each: true })
  id: number[];

  @IsInteger('สถานะ')
  @IsRequiredField()
  status:number
}