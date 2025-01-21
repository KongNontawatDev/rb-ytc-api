import { BaseDto } from '@common/dto/base.dto';
import {
  IsRequiredField,
  IsValidString,
} from '@common/validation/validation.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAmphureDto extends BaseDto {
  @IsValidString('ชื่ออำเภอ')
  @IsRequiredField('ชื่ออำเภอ')
  @ApiProperty({ description: 'ชื่ออำเภอ' })
  name: string;

  @IsValidString('รหัสจังหวัด')
  @IsRequiredField('รหัสจังหวัด')
  @ApiProperty({ description: 'รหัสจังหวัดจากตาราง province' })
  province_id: number;
}
