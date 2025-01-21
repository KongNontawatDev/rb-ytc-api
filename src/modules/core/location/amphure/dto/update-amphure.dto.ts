import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAmphureDto } from './create-amphure.dto';
import { IsInt, IsNumber } from 'class-validator';
import { IsArrayField, IsInteger, IsRequiredField } from '@common/validation/validation.decorator';

export class UpdateAmphureDto extends PartialType(CreateAmphureDto) {
  @IsInt({ message: 'id ต้องเป็นตัวเลขเท่านั้น' })
  @ApiProperty({
    description: 'รหัสอำเภอ',
    example: 2,
    required: true,
    type: Number,
  })
  id: number;
}

export class DeleteManyAmphureDto {
  @IsArrayField('รหัสอำเภอ')
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: 'รหัสอำเภอ',
    example: [1,2,5,8],
    required: true,
    type: 'array',
  })
  id: number[];
}