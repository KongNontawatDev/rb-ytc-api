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
exports.UpdateManyRoomDto = exports.DeleteManyRoomDto = exports.DeleteRoomParamDto = exports.UpdateRoomParamDto = exports.FindOneRoomParamDto = exports.FindRoomsByConditionQueryDto = void 0;
const base_dto_1 = require("../../../../common/dto/base.dto");
const validation_decorator_1 = require("../../../../common/validation/validation.decorator");
const class_validator_1 = require("class-validator");
class FindRoomsByConditionQueryDto extends base_dto_1.BaseQueryDto {
}
exports.FindRoomsByConditionQueryDto = FindRoomsByConditionQueryDto;
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsValidString)(),
    __metadata("design:type", String)
], FindRoomsByConditionQueryDto.prototype, "status", void 0);
class FindOneRoomParamDto {
}
exports.FindOneRoomParamDto = FindOneRoomParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], FindOneRoomParamDto.prototype, "id", void 0);
class UpdateRoomParamDto {
}
exports.UpdateRoomParamDto = UpdateRoomParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], UpdateRoomParamDto.prototype, "id", void 0);
class DeleteRoomParamDto {
}
exports.DeleteRoomParamDto = DeleteRoomParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], DeleteRoomParamDto.prototype, "id", void 0);
class DeleteManyRoomDto {
}
exports.DeleteManyRoomDto = DeleteManyRoomDto;
__decorate([
    (0, validation_decorator_1.IsArrayField)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], DeleteManyRoomDto.prototype, "id", void 0);
class UpdateManyRoomDto {
}
exports.UpdateManyRoomDto = UpdateManyRoomDto;
__decorate([
    (0, validation_decorator_1.IsArrayField)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], UpdateManyRoomDto.prototype, "id", void 0);
__decorate([
    (0, validation_decorator_1.IsInteger)('สถานะ'),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], UpdateManyRoomDto.prototype, "status", void 0);
//# sourceMappingURL=params-room.dto.js.map