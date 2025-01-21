import { BaseQueryDto } from '@common/dto/base.dto';
import { IsOptionalField } from '@common/validation/validation.decorator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
} from 'class-validator';

export class FindDistrictsByConditionQueryDto extends BaseQueryDto {
    @IsOptionalField('amphure_id')
  @IsNumberString({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' })
    @ApiProperty({
    description: 'ค้นหาตาม id อำเภอ (amphure_id)',
    required: false,
  })
  amphure_id: string;
}

export class FindOneDistrictParamDto {
  @IsNumberString({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' })
  id: string;
}

export class UpdateDistrictParamDto {
  @IsNumberString({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' })
  id: string;
}

export class DeleteDistrictParamDto {
  @IsNumberString({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' })
  id: string;
}
