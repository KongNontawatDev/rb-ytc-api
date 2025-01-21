import { user } from '@prisma/client';

export class UserDto implements Partial<user> {
  id: number;
  department_id: number;
  full_name: string;
  tel: string;
  image: string;
  status: number;
  line_name: string;
  line_id: string;
  created_at: Date;
  updated_at: Date;
}



