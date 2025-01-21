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
exports.UpdateStatusDepartmentDto = exports.UpdateManyDepartmentDto = exports.DeleteManyDepartmentDto = exports.DeleteDepartmentParamDto = exports.UpdateDepartmentParamDto = exports.FindOneDepartmentParamDto = exports.FindDepartmentsByConditionQueryDto = void 0;
const base_dto_1 = require("../../../../common/dto/base.dto");
const validation_decorator_1 = require("../../../../common/validation/validation.decorator");
const class_validator_1 = require("class-validator");
class FindDepartmentsByConditionQueryDto extends base_dto_1.BaseQueryDto {
}
exports.FindDepartmentsByConditionQueryDto = FindDepartmentsByConditionQueryDto;
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsValidString)(),
    __metadata("design:type", String)
], FindDepartmentsByConditionQueryDto.prototype, "status", void 0);
class FindOneDepartmentParamDto {
}
exports.FindOneDepartmentParamDto = FindOneDepartmentParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    __metadata("design:type", String)
], FindOneDepartmentParamDto.prototype, "id", void 0);
class UpdateDepartmentParamDto {
}
exports.UpdateDepartmentParamDto = UpdateDepartmentParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    __metadata("design:type", String)
], UpdateDepartmentParamDto.prototype, "id", void 0);
class DeleteDepartmentParamDto {
}
exports.DeleteDepartmentParamDto = DeleteDepartmentParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    __metadata("design:type", String)
], DeleteDepartmentParamDto.prototype, "id", void 0);
class DeleteManyDepartmentDto {
}
exports.DeleteManyDepartmentDto = DeleteManyDepartmentDto;
__decorate([
    (0, validation_decorator_1.IsArrayField)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], DeleteManyDepartmentDto.prototype, "id", void 0);
class UpdateManyDepartmentDto {
}
exports.UpdateManyDepartmentDto = UpdateManyDepartmentDto;
__decorate([
    (0, validation_decorator_1.IsArrayField)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], UpdateManyDepartmentDto.prototype, "id", void 0);
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], UpdateManyDepartmentDto.prototype, "status", void 0);
class UpdateStatusDepartmentDto {
}
exports.UpdateStatusDepartmentDto = UpdateStatusDepartmentDto;
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], UpdateStatusDepartmentDto.prototype, "status", void 0);
//# sourceMappingURL=params-department.dto.js.map