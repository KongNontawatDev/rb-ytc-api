"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmphureDocs = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_1 = require("../../../../common/utils/docs/api-responses");
const create_amphure_dto_1 = require("./dto/create-amphure.dto");
const amphure_dto_1 = require("./dto/amphure.dto");
const update_amphure_dto_1 = require("./dto/update-amphure.dto");
exports.AmphureDocs = {
    create: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'เพิ่มข้อมูลอำเภอ' }), (0, swagger_1.ApiExtraModels)(create_amphure_dto_1.CreateAmphureDto), ...(0, api_responses_1.createCommonApiResponses)({ id: 1, name: 'ยโสธร' }));
    },
    findByCondition: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'เรียกดูอำเภอตามเงื่อนไข' }), (0, swagger_1.ApiExtraModels)(amphure_dto_1.AmphureDto), ...(0, api_responses_1.createCommonApiResponses)([
            { id: 1, name: 'กรุงเทพ' },
            { id: 2, name: 'ยโสธร' },
        ], false, false));
    },
    findAll: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'เรียกดูอำเภอทั้งหมด' }), (0, swagger_1.ApiExtraModels)(amphure_dto_1.AmphureDto), ...(0, api_responses_1.createCommonApiResponses)([
            { id: 1, name: 'กรุงเทพ' },
            { id: 2, name: 'ยโสธร' },
        ], false, false));
    },
    findOne: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'เรียกดูอำเภอตาม id' }), (0, swagger_1.ApiExtraModels)(amphure_dto_1.AmphureDto), ...(0, api_responses_1.createCommonApiResponses)({ name: 'กรุงเทพ' }, false, false));
    },
    update: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'แก้ไขข้อมูลอำเภอ' }), (0, swagger_1.ApiExtraModels)(update_amphure_dto_1.UpdateAmphureDto), ...(0, api_responses_1.createCommonApiResponses)({ id: 1, name: 'ยโสธร2' }));
    },
    remove: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'ลบอำเภอตาม id' }), ...(0, api_responses_1.createCommonApiResponses)({ id: 1, name: 'กรุงเทพ' }));
    },
    removeMany: () => {
        return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description: 'ลบอำเภอหลายแถวด้วย id แบบ array' }), ...(0, api_responses_1.createCommonApiResponses)([{ id: 1, name: 'กรุงเทพ' }, { id: 2, name: 'ยโสธร' }]));
    },
};
//# sourceMappingURL=amphure.docs.js.map