"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvinceDocs = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_1 = require("../../../../common/utils/docs/api-responses");
const create_province_dto_1 = require("./dto/create-province.dto");
const province_dto_1 = require("./dto/province.dto");
const update_province_dto_1 = require("./dto/update-province.dto");
exports.ProvinceDocs = {
    create: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'เพิ่มข้อมูลจังหวัด' }), (0, swagger_1.ApiExtraModels)(create_province_dto_1.CreateProvinceDto), ...(0, api_responses_1.createCommonApiResponses)({ id: 1, name: 'ยโสธร' }));
    },
    findByCondition: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'เรียกดูจังหวัดตามเงื่อนไข' }), (0, swagger_1.ApiExtraModels)(province_dto_1.ProvinceDto), ...(0, api_responses_1.createCommonApiResponses)([
            { id: 1, name: 'กรุงเทพ' },
            { id: 2, name: 'ยโสธร' },
        ], false, false));
    },
    findAll: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'เรียกดูจังหวัดทั้งหมด' }), (0, swagger_1.ApiExtraModels)(province_dto_1.ProvinceDto), ...(0, api_responses_1.createCommonApiResponses)([
            { id: 1, name: 'กรุงเทพ' },
            { id: 2, name: 'ยโสธร' },
        ], false, false));
    },
    findOne: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'เรียกดูจังหวัดตาม id' }), (0, swagger_1.ApiExtraModels)(province_dto_1.ProvinceDto), ...(0, api_responses_1.createCommonApiResponses)({ name: 'กรุงเทพ' }, false, false));
    },
    update: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'แก้ไขข้อมูลจังหวัด' }), (0, swagger_1.ApiExtraModels)(update_province_dto_1.UpdateProvinceDto), ...(0, api_responses_1.createCommonApiResponses)({ id: 1, name: 'ยโสธร2' }));
    },
    remove: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'ลบจังหวัดตาม id' }), ...(0, api_responses_1.createCommonApiResponses)({ id: 1, name: 'กรุงเทพ' }));
    },
    removeMany: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'ลบจังหวัดหลายแถวด้วย id แบบ array' }), ...(0, api_responses_1.createCommonApiResponses)({ count: 2 }));
    },
};
//# sourceMappingURL=province.docs.js.map