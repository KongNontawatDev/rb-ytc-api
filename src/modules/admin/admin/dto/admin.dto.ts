import { admin } from '@prisma/client';

export class AdminDto implements Partial<admin> {
  id: number;
  role_id: number;
  name: string;
  email: string;
  tel: string;
  image: string;
  password: string;
  status: number;
  reset_token: string;
  reset_token_expiry: Date;
  created_at: Date;
  updated_at: Date;
}



