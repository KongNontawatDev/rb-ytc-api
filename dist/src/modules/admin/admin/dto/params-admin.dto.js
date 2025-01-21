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
exports.UpdateManyAdminDto = exports.DeleteManyAdminDto = exports.DeleteAdminParamDto = exports.UpdateAdminParamDto = exports.FindOneAdminParamDto = exports.FindAdminsByConditionQueryDto = void 0;
const base_dto_1 = require("../../../../common/dto/base.dto");
const validation_decorator_1 = require("../../../../common/validation/validation.decorator");
const class_validator_1 = require("class-validator");
class FindAdminsByConditionQueryDto extends base_dto_1.BaseQueryDto {
}
exports.FindAdminsByConditionQueryDto = FindAdminsByConditionQueryDto;
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsValidString)(),
    __metadata("design:type", String)
], FindAdminsByConditionQueryDto.prototype, "status", void 0);
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsValidString)(),
    __metadata("design:type", String)
], FindAdminsByConditionQueryDto.prototype, "role_id", void 0);
class FindOneAdminParamDto {
}
exports.FindOneAdminParamDto = FindOneAdminParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], FindOneAdminParamDto.prototype, "id", void 0);
class UpdateAdminParamDto {
}
exports.UpdateAdminParamDto = UpdateAdminParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], UpdateAdminParamDto.prototype, "id", void 0);
class DeleteAdminParamDto {
}
exports.DeleteAdminParamDto = DeleteAdminParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], DeleteAdminParamDto.prototype, "id", void 0);
class DeleteManyAdminDto {
}
exports.DeleteManyAdminDto = DeleteManyAdminDto;
__decorate([
    (0, validation_decorator_1.IsArrayField)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], DeleteManyAdminDto.prototype, "id", void 0);
class UpdateManyAdminDto {
}
exports.UpdateManyAdminDto = UpdateManyAdminDto;
__decorate([
    (0, validation_decorator_1.IsArrayField)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], UpdateManyAdminDto.prototype, "id", void 0);
__decorate([
    (0, validation_decorator_1.IsInteger)('สถานะ'),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], UpdateManyAdminDto.prototype, "status", void 0);
//# sourceMappingURL=params-admin.dto.js.map