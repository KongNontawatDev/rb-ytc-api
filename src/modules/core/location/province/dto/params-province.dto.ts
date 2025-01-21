import { BaseQueryDto } from '@common/dto/base.dto';
import {
  IsNumberString,
} from 'class-validator';

export class FindProvincesByConditionQueryDto extends BaseQueryDto {}

export class FindOneProvinceParamDto {
  @IsNumberString({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' })
  id: string;
}

export class UpdateProvinceParamDto {
  @IsNumberString({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' })
  id: string;
}

export class DeleteProvinceParamDto {
  @IsNumberString({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' })
  id: string;
}
