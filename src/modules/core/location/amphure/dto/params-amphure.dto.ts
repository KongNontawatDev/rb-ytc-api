import { BaseQueryDto } from '@common/dto/base.dto';
import { IsOptionalField } from '@common/validation/validation.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class FindAmphuresByConditionQueryDto extends BaseQueryDto {
  @IsOptionalField('province_id')
  @IsNumberString({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' })
  @ApiProperty({
    description: 'ค้นหาตาม id จังหวัด (province_id)',
    required: false,
  })
  province_id: string;
}

export class FindOneAmphureParamDto {
  @IsNumberString({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' })
  id: string;
}

export class UpdateAmphureParamDto {
  @IsNumberString({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' })
  id: string;
}

export class DeleteAmphureParamDto {
  @IsNumberString({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' })
  id: string;
}
