import { IsRequiredField, IsValidString } from "@common/validation/validation.decorator";

export class CreateDepartmentDto {
  @IsValidString()
  @IsRequiredField()
  name: string;
}
