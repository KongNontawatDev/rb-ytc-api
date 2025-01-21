import { BaseDto } from '@common/dto/base.dto';
import {
  IsRequiredField,
  IsValidString,
} from '@common/validation/validation.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDistrictDto extends BaseDto {
  @IsValidString('รหัสอำเภอ')
  @IsRequiredField('รหัสอำเภอ')
  @ApiProperty({ description: 'รหัสอำเภอจากตาราง amphure' })
  amphure_id: number;

  @IsValidString('ชื่อตำบล')
  @IsRequiredField('ชื่อตำบล')
  @ApiProperty({ description: 'ชื่อตำบล' })
  name: string;

  @IsValidString('รหัสไปรษณีย์')
  @IsRequiredField('รหัสไปรษณีย์')
  @ApiProperty({ description: 'รหัสไปรษณีย์' })
  zip_code: string;
}
