import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { createCommonApiResponses } from 'src/common/utils/docs/api-responses';
import { CreateProvinceDto } from './dto/create-province.dto';
import { ProvinceDto } from './dto/province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';



export const ProvinceDocs = {
  create: () => {
    return applyDecorators(
      ApiOperation({ description: 'เพิ่มข้อมูลจังหวัด' }),
      ApiExtraModels(CreateProvinceDto),
      ...createCommonApiResponses({ id: 1, name: 'ยโสธร' })
    );
  },

  findByCondition: () => {
    return applyDecorators(
      ApiOperation({ description: 'เรียกดูจังหวัดตามเงื่อนไข' }),
      ApiExtraModels(ProvinceDto),
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
      ApiOperation({ description: 'เรียกดูจังหวัดทั้งหมด' }),
      ApiExtraModels(ProvinceDto),
      ...createCommonApiResponses([
        { id: 1, name: 'กรุงเทพ' },
        { id: 2, name: 'ยโสธร' },
      ],
      false,false)
    );
  },

  findOne: () => {
    return applyDecorators(
      ApiOperation({ description: 'เรียกดูจังหวัดตาม id' }),
      ApiExtraModels(ProvinceDto),
      ...createCommonApiResponses({ name: 'กรุงเทพ' }, false, false)
    );
  },

  update: () => {
    return applyDecorators(
      ApiOperation({ description: 'แก้ไขข้อมูลจังหวัด' }),
      ApiExtraModels(UpdateProvinceDto),
      ...createCommonApiResponses({ id: 1, name: 'ยโสธร2' })
    );
  },

  remove: () => {
    return applyDecorators(
      ApiOperation({ description: 'ลบจังหวัดตาม id' }),
      ...createCommonApiResponses({ id: 1, name: 'กรุงเทพ' })
    );
  },

  removeMany: () => {
    return applyDecorators(
      ApiOperation({ description: 'ลบจังหวัดหลายแถวด้วย id แบบ array' }),
      ...createCommonApiResponses({count: 2})
    );
  },
};
