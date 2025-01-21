"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDistrictParamDto = exports.UpdateDistrictParamDto = exports.FindOneDistrictParamDto = exports.FindDistrictsByConditionQueryDto = void 0;
const base_dto_1 = require("../../../../../common/dto/base.dto");
const validation_decorator_1 = require("../../../../../common/validation/validation.decorator");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FindDistrictsByConditionQueryDto extends base_dto_1.BaseQueryDto {
}
exports.FindDistrictsByConditionQueryDto = FindDistrictsByConditionQueryDto;
__decorate([
    (0, validation_decorator_1.IsOptionalField)('amphure_id'),
    (0, class_validator_1.IsNumberString)({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' }),
    (0, swagger_1.ApiProperty)({
        description: 'ค้นหาตาม id อำเภอ (amphure_id)',
        required: false,
    }),
    __metadata("design:type", String)
], FindDistrictsByConditionQueryDto.prototype, "amphure_id", void 0);
class FindOneDistrictParamDto {
}
exports.FindOneDistrictParamDto = FindOneDistrictParamDto;
__decorate([
    (0, class_validator_1.IsNumberString)({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' }),
    __metadata("design:type", String)
], FindOneDistrictParamDto.prototype, "id", void 0);
class UpdateDistrictParamDto {
}
exports.UpdateDistrictParamDto = UpdateDistrictParamDto;
__decorate([
    (0, class_validator_1.IsNumberString)({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' }),
    __metadata("design:type", String)
], UpdateDistrictParamDto.prototype, "id", void 0);
class DeleteDistrictParamDto {
}
exports.DeleteDistrictParamDto = DeleteDistrictParamDto;
__decorate([
    (0, class_validator_1.IsNumberString)({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' }),
    __metadata("design:type", String)
], DeleteDistrictParamDto.prototype, "id", void 0);
//# sourceMappingURL=params-district.dto.js.map