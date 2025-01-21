import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDistrictDto } from './create-district.dto';
import { IsInt, IsNumber } from 'class-validator';
import {
  IsArrayField,
  IsRequiredField,
  IsValidString,
} from '@common/validation/validation.decorator';

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {
  @IsInt({ message: 'id ต้องเป็นตัวเลขเท่านั้น' })
  @ApiProperty({
    description: 'รหัสตำบล',
    example: 2,
    required: true,
    type: Number,
  })
  id: number;

}

export class DeleteManyDistrictDto {
  @IsArrayField('รหัสตำบล')
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: 'รหัสตำบล',
    example: [1, 2, 5, 8],
    required: true,
    type: 'array',
  })
  id: number[];
}
