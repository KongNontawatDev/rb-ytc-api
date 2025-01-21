import { ApiProperty } from '@nestjs/swagger';
import { district } from '@prisma/client';

export class DistrictDto implements district {
  @ApiProperty({ description: 'รหัสตำบล' })
  id: number;

  @ApiProperty({ description: 'รหัสอำเภอจากตาราง amphure' })
  amphure_id: number;

  @ApiProperty({ description: 'ชื่อตำบล' })
  name: string;

  @ApiProperty({ description: 'รหัสไปรษณีย์' })
  zip_code: string;

  @ApiProperty({ description: 'สร้างข้อมูลเมื่อ' })
  created_at: Date;

  @ApiProperty({ description: 'แก้ไขล่าสุดเมื่อ' })
  updated_at: Date;
}
