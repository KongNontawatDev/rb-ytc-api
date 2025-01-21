import { PartialType } from '@nestjs/swagger';
import { CreateDepartmentDto } from './create-department.dto';
import { IsInteger } from '@common/validation/validation.decorator';

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
  @IsInteger()
  id: number;

  @IsInteger()
  status: number;
}
