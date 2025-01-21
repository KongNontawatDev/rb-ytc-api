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
exports.UpdateManyAccessoryDto = exports.DeleteManyAccessoryDto = exports.DeleteAccessoryParamDto = exports.UpdateAccessoryParamDto = exports.FindOneAccessoryParamDto = exports.FindAccessorysByConditionQueryDto = void 0;
const base_dto_1 = require("../../../../common/dto/base.dto");
const validation_decorator_1 = require("../../../../common/validation/validation.decorator");
const class_validator_1 = require("class-validator");
class FindAccessorysByConditionQueryDto extends base_dto_1.BaseQueryDto {
}
exports.FindAccessorysByConditionQueryDto = FindAccessorysByConditionQueryDto;
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsValidString)(),
    __metadata("design:type", String)
], FindAccessorysByConditionQueryDto.prototype, "status", void 0);
class FindOneAccessoryParamDto {
}
exports.FindOneAccessoryParamDto = FindOneAccessoryParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], FindOneAccessoryParamDto.prototype, "id", void 0);
class UpdateAccessoryParamDto {
}
exports.UpdateAccessoryParamDto = UpdateAccessoryParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], UpdateAccessoryParamDto.prototype, "id", void 0);
class DeleteAccessoryParamDto {
}
exports.DeleteAccessoryParamDto = DeleteAccessoryParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], DeleteAccessoryParamDto.prototype, "id", void 0);
class DeleteManyAccessoryDto {
}
exports.DeleteManyAccessoryDto = DeleteManyAccessoryDto;
__decorate([
    (0, validation_decorator_1.IsArrayField)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], DeleteManyAccessoryDto.prototype, "id", void 0);
class UpdateManyAccessoryDto {
}
exports.UpdateManyAccessoryDto = UpdateManyAccessoryDto;
__decorate([
    (0, validation_decorator_1.IsArrayField)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], UpdateManyAccessoryDto.prototype, "id", void 0);
__decorate([
    (0, validation_decorator_1.IsInteger)('สถานะ'),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], UpdateManyAccessoryDto.prototype, "status", void 0);
//# sourceMappingURL=params-accessory.dto.js.map