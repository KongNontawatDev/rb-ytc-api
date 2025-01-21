import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { createCommonApiResponses } from 'src/common/utils/docs/api-responses';
import { CreateDistrictDto } from './dto/create-district.dto';
import { DistrictDto } from './dto/district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';



export const DistrictDocs = {
  create: () => {
    return applyDecorators(
      ApiOperation({ description: 'เพิ่มข้อมูลตำบล' }),
      ApiExtraModels(CreateDistrictDto),
      ...createCommonApiResponses({ id: 1, name: 'ยโสธร' })
    );
  },

  findByCondition: () => {
    return applyDecorators(
      ApiOperation({ description: 'เรียกดูตำบลตามเงื่อนไข' }),
      ApiExtraModels(DistrictDto),
      ...createCommonApiResponses(
        [
          { id: 1, name: 'กรุงเทพ' },
          { id: 2, name: 'ยโสธร' },
        ],
        false,
        false
      )
    );
  },

  findAll: () => {
    return applyDecorators(
      ApiOperation({ description: 'เรียกดูตำบลทั้งหมด' }),
      ApiExtraModels(DistrictDto),
      ...createCommonApiResponses([
        { id: 1, name: 'กรุงเทพ' },
        { id: 2, name: 'ยโสธร' },
      ],
      false,false)
    );
  },

  findOne: () => {
    return applyDecorators(
      ApiOperation({ description: 'เรียกดูตำบลตาม id' }),
      ApiExtraModels(DistrictDto),
      ...createCommonApiResponses({ name: 'กรุงเทพ' }, false, false)
    );
  },

  update: () => {
    return applyDecorators(
      ApiOperation({ description: 'แก้ไขข้อมูลตำบล' }),
      ApiExtraModels(UpdateDistrictDto),
      ...createCommonApiResponses({ id: 1, name: 'ยโสธร2' })
    );
  },

  remove: () => {
    return applyDecorators(
      ApiOperation({ description: 'ลบตำบลตาม id' }),
      ...createCommonApiResponses({ id: 1, name: 'กรุงเทพ' })
    );
  },

  removeMany: () => {
    return applyDecorators(
      ApiOperation({ description: 'ลบตำบลหลายแถวด้วย id แบบ array' }),
      ...createCommonApiResponses([{ id: 1, name: 'กรุงเทพ' },{ id: 2, name: 'ยโสธร' }])
    );
  },
};
