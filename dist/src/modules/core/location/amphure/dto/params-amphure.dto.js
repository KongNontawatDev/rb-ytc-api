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
exports.DeleteAmphureParamDto = exports.UpdateAmphureParamDto = exports.FindOneAmphureParamDto = exports.FindAmphuresByConditionQueryDto = void 0;
const base_dto_1 = require("../../../../../common/dto/base.dto");
const validation_decorator_1 = require("../../../../../common/validation/validation.decorator");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FindAmphuresByConditionQueryDto extends base_dto_1.BaseQueryDto {
}
exports.FindAmphuresByConditionQueryDto = FindAmphuresByConditionQueryDto;
__decorate([
    (0, validation_decorator_1.IsOptionalField)('province_id'),
    (0, class_validator_1.IsNumberString)({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' }),
    (0, swagger_1.ApiProperty)({
        description: 'ค้นหาตาม id จังหวัด (province_id)',
        required: false,
    }),
    __metadata("design:type", String)
], FindAmphuresByConditionQueryDto.prototype, "province_id", void 0);
class FindOneAmphureParamDto {
}
exports.FindOneAmphureParamDto = FindOneAmphureParamDto;
__decorate([
    (0, class_validator_1.IsNumberString)({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' }),
    __metadata("design:type", String)
], FindOneAmphureParamDto.prototype, "id", void 0);
class UpdateAmphureParamDto {
}
exports.UpdateAmphureParamDto = UpdateAmphureParamDto;
__decorate([
    (0, class_validator_1.IsNumberString)({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' }),
    __metadata("design:type", String)
], UpdateAmphureParamDto.prototype, "id", void 0);
class DeleteAmphureParamDto {
}
exports.DeleteAmphureParamDto = DeleteAmphureParamDto;
__decorate([
    (0, class_validator_1.IsNumberString)({}, { message: 'id ต้องเป็นตัวเลขเท่านั้น' }),
    __metadata("design:type", String)
], DeleteAmphureParamDto.prototype, "id", void 0);
//# sourceMappingURL=params-amphure.dto.js.map