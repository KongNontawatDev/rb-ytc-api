import { BaseDto } from "@common/dto/base.dto";
import { IsRequiredField, IsValidString } from "@common/validation/validation.decorator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProvinceDto extends BaseDto{
  @IsValidString('ชื่อจังหวัด')
  @IsRequiredField('ชื่อจังหวัด')
  @ApiProperty({ description: 'ชื่อจังหวัด' })
  name: string;
}
