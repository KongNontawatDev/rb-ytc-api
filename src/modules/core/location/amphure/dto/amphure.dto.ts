import { ApiProperty } from '@nestjs/swagger';
import { amphure } from '@prisma/client';

export class AmphureDto implements amphure {
  @ApiProperty({ description: 'รหัสอำเภอ', })
  id: number;
  
  @ApiProperty({ description: 'รหัสของตาราง province (จังหวัด)', })
  province_id: number;

  @ApiProperty({ description: 'ชื่ออำเภอ', })
  name: string;

  @ApiProperty({ description: 'สร้างข้อมูลเมื่อ', })
  created_at: Date;

  @ApiProperty({ description: 'แก้ไขล่าสุดเมื่อ', })
  updated_at: Date;
}
