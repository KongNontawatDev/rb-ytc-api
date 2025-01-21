import { room } from '@prisma/client';

export class RoomDto implements Partial<room> {
  id: number;
  name: string;
  detail: string;
  location: string;
  size: string;
  capacity: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}



