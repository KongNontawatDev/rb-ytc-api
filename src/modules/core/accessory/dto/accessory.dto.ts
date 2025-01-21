import { accessory } from '@prisma/client';

export class AccessoryDto implements Partial<accessory> {
  id: number;
  name: string;
  detail: string;
  image: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}



