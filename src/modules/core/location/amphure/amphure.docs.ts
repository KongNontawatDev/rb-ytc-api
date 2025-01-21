import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { createCommonApiResponses } from 'src/common/utils/docs/api-responses';
import { CreateAmphureDto } from './dto/create-amphure.dto';
import { AmphureDto } from './dto/amphure.dto';
import { UpdateAmphureDto } from './dto/update-amphure.dto';



export const AmphureDocs = {
  create: () => {
    return applyDecorators(
      ApiOperation({ description: 'เพิ่มข้อมูลอำเภอ' }),
      ApiExtraModels(CreateAmphureDto),
      ...createCommonApiResponses({ id: 1, name: 'ยโสธร' })
    );
  },

  findByCondition: () => {
    return applyDecorators(
      ApiOperation({ description: 'เรียกดูอำเภอตามเงื่อนไข' }),
      ApiExtraModels(AmphureDto),
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
      ApiOperation({ description: 'เรียกดูอำเภอทั้งหมด' }),
      ApiExtraModels(AmphureDto),
      ...createCommonApiResponses([
        { id: 1, name: 'กรุงเทพ' },
        { id: 2, name: 'ยโสธร' },
      ],
      false,false)
    );
  },

  findOne: () => {
    return applyDecorators(
      ApiOperation({ description: 'เรียกดูอำเภอตาม id' }),
      ApiExtraModels(AmphureDto),
      ...createCommonApiResponses({ name: 'กรุงเทพ' }, false, false)
    );
  },

  update: () => {
    return applyDecorators(
      ApiOperation({ description: 'แก้ไขข้อมูลอำเภอ' }),
      ApiExtraModels(UpdateAmphureDto),
      ...createCommonApiResponses({ id: 1, name: 'ยโสธร2' })
    );
  },

  remove: () => {
    return applyDecorators(
      ApiOperation({ description: 'ลบอำเภอตาม id' }),
      ...createCommonApiResponses({ id: 1, name: 'กรุงเทพ' })
    );
  },

  removeMany: () => {
    return applyDecorators(
      ApiOperation({ description: 'ลบอำเภอหลายแถวด้วย id แบบ array' }),
      ...createCommonApiResponses([{ id: 1, name: 'กรุงเทพ' },{ id: 2, name: 'ยโสธร' }])
    );
  },
};
