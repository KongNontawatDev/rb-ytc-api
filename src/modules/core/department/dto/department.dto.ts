import { ApiProperty } from '@nestjs/swagger';
import { department } from '@prisma/client';

export class DepartmentDto implements department {
  id: number;
  name: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}
