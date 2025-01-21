import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProvinceDto } from './create-province.dto';
import { IsInt, IsNumber } from 'class-validator';
import { IsArrayField } from '@common/validation/validation.decorator';
import { BaseDto } from '@common/dto/base.dto';

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {
  @IsInt({ message: 'id ต้องเป็นตัวเลขเท่านั้น' })
  @ApiProperty({
    description: 'รหัสจังหวัด',
    example: 2,
    required: true,
    type: Number,
  })
  id: number;
}

export class DeleteManyProvinceDto extends BaseDto {
  @IsArrayField('รหัสจังหวัด')
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: 'รหัสจังหวัด',
    example: [1,2,5,8],
    required: true,
    type: 'array',
  })
  id: number[];
}