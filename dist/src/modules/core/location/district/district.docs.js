"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistrictDocs = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_1 = require("../../../../common/utils/docs/api-responses");
const create_district_dto_1 = require("./dto/create-district.dto");
const district_dto_1 = require("./dto/district.dto");
const update_district_dto_1 = require("./dto/update-district.dto");
exports.DistrictDocs = {
    create: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'เพิ่มข้อมูลตำบล' }), (0, swagger_1.ApiExtraModels)(create_district_dto_1.CreateDistrictDto), ...(0, api_responses_1.createCommonApiResponses)({ id: 1, name: 'ยโสธร' }));
    },
    findByCondition: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'เรียกดูตำบลตามเงื่อนไข' }), (0, swagger_1.ApiExtraModels)(district_dto_1.DistrictDto), ...(0, api_responses_1.createCommonApiResponses)([
            { id: 1, name: 'กรุงเทพ' },
            { id: 2, name: 'ยโสธร' },
        ], false, false));
    },
    findAll: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'เรียกดูตำบลทั้งหมด' }), (0, swagger_1.ApiExtraModels)(district_dto_1.DistrictDto), ...(0, api_responses_1.createCommonApiResponses)([
            { id: 1, name: 'กรุงเทพ' },
            { id: 2, name: 'ยโสธร' },
        ], false, false));
    },
    findOne: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'เรียกดูตำบลตาม id' }), (0, swagger_1.ApiExtraModels)(district_dto_1.DistrictDto), ...(0, api_responses_1.createCommonApiResponses)({ name: 'กรุงเทพ' }, false, false));
    },
    update: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'แก้ไขข้อมูลตำบล' }), (0, swagger_1.ApiExtraModels)(update_district_dto_1.UpdateDistrictDto), ...(0, api_responses_1.createCommonApiResponses)({ id: 1, name: 'ยโสธร2' }));
    },
    remove: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'ลบตำบลตาม id' }), ...(0, api_responses_1.createCommonApiResponses)({ id: 1, name: 'กรุงเทพ' }));
    },
    removeMany: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'ลบตำบลหลายแถวด้วย id แบบ array' }), ...(0, api_responses_1.createCommonApiResponses)([{ id: 1, name: 'กรุงเทพ' }, { id: 2, name: 'ยโสธร' }]));
    },
};
//# sourceMappingURL=district.docs.js.map