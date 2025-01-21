import { ApiProperty } from '@nestjs/swagger';
import { province } from '@prisma/client';

export class ProvinceDto implements province {
  @ApiProperty({ description: 'รหัส', })
  id: number;

  @ApiProperty({ description: 'ชื่อ', })
  name: string;

  @ApiProperty({ description: 'สร้างข้อมูลเมื่อ', })
  created_at: Date;

  @ApiProperty({ description: 'แก้ไขล่าสุดเมื่อ', })
  updated_at: Date;
}
