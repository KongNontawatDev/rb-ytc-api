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
exports.UpdateManyUserDto = exports.DeleteManyUserDto = exports.DeleteUserParamDto = exports.UpdateUserParamDto = exports.FindOneUserParamDto = exports.FindUsersByConditionQueryDto = void 0;
const base_dto_1 = require("../../../../common/dto/base.dto");
const validation_decorator_1 = require("../../../../common/validation/validation.decorator");
const class_validator_1 = require("class-validator");
class FindUsersByConditionQueryDto extends base_dto_1.BaseQueryDto {
}
exports.FindUsersByConditionQueryDto = FindUsersByConditionQueryDto;
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsValidString)(),
    __metadata("design:type", String)
], FindUsersByConditionQueryDto.prototype, "status", void 0);
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsValidString)(),
    __metadata("design:type", String)
], FindUsersByConditionQueryDto.prototype, "department_id", void 0);
class FindOneUserParamDto {
}
exports.FindOneUserParamDto = FindOneUserParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], FindOneUserParamDto.prototype, "id", void 0);
class UpdateUserParamDto {
}
exports.UpdateUserParamDto = UpdateUserParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], UpdateUserParamDto.prototype, "id", void 0);
class DeleteUserParamDto {
}
exports.DeleteUserParamDto = DeleteUserParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], DeleteUserParamDto.prototype, "id", void 0);
class DeleteManyUserDto {
}
exports.DeleteManyUserDto = DeleteManyUserDto;
__decorate([
    (0, validation_decorator_1.IsArrayField)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], DeleteManyUserDto.prototype, "id", void 0);
class UpdateManyUserDto {
}
exports.UpdateManyUserDto = UpdateManyUserDto;
__decorate([
    (0, validation_decorator_1.IsArrayField)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], UpdateManyUserDto.prototype, "id", void 0);
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], UpdateManyUserDto.prototype, "status", void 0);
//# sourceMappingURL=params-user.dto.js.map