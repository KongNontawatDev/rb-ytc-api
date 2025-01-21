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
exports.UpdateManyBookingListDto = exports.DeleteManyBookingListDto = exports.DeleteBookingListParamDto = exports.UpdateBookingListParamDto = exports.findManyBookingListByUserForCalendarAndTimelineParamDto = exports.findManyBookingListByRoomForCalendarAndTimelineParamDto = exports.findManyBookingListByUserDto = exports.FindOneBookingListParamDto = exports.FindBookingListsByConditionQueryDto = void 0;
const base_dto_1 = require("../../../../common/dto/base.dto");
const validation_decorator_1 = require("../../../../common/validation/validation.decorator");
const class_validator_1 = require("class-validator");
class FindBookingListsByConditionQueryDto extends base_dto_1.BaseQueryDto {
}
exports.FindBookingListsByConditionQueryDto = FindBookingListsByConditionQueryDto;
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsValidString)(),
    __metadata("design:type", String)
], FindBookingListsByConditionQueryDto.prototype, "status", void 0);
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsDateField)(),
    __metadata("design:type", Date)
], FindBookingListsByConditionQueryDto.prototype, "book_start", void 0);
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsDateField)(),
    __metadata("design:type", Date)
], FindBookingListsByConditionQueryDto.prototype, "book_end", void 0);
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsNumberStringField)(),
    __metadata("design:type", String)
], FindBookingListsByConditionQueryDto.prototype, "user_id", void 0);
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsNumberStringField)(),
    __metadata("design:type", String)
], FindBookingListsByConditionQueryDto.prototype, "room_id", void 0);
class FindOneBookingListParamDto {
}
exports.FindOneBookingListParamDto = FindOneBookingListParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], FindOneBookingListParamDto.prototype, "id", void 0);
class findManyBookingListByUserDto {
}
exports.findManyBookingListByUserDto = findManyBookingListByUserDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], findManyBookingListByUserDto.prototype, "user_id", void 0);
class findManyBookingListByRoomForCalendarAndTimelineParamDto {
}
exports.findManyBookingListByRoomForCalendarAndTimelineParamDto = findManyBookingListByRoomForCalendarAndTimelineParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], findManyBookingListByRoomForCalendarAndTimelineParamDto.prototype, "room_id", void 0);
class findManyBookingListByUserForCalendarAndTimelineParamDto {
}
exports.findManyBookingListByUserForCalendarAndTimelineParamDto = findManyBookingListByUserForCalendarAndTimelineParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], findManyBookingListByUserForCalendarAndTimelineParamDto.prototype, "user_id", void 0);
class UpdateBookingListParamDto {
}
exports.UpdateBookingListParamDto = UpdateBookingListParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], UpdateBookingListParamDto.prototype, "id", void 0);
class DeleteBookingListParamDto {
}
exports.DeleteBookingListParamDto = DeleteBookingListParamDto;
__decorate([
    (0, validation_decorator_1.IsNumberStringField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], DeleteBookingListParamDto.prototype, "id", void 0);
class DeleteManyBookingListDto {
}
exports.DeleteManyBookingListDto = DeleteManyBookingListDto;
__decorate([
    (0, validation_decorator_1.IsArrayField)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], DeleteManyBookingListDto.prototype, "id", void 0);
class UpdateManyBookingListDto {
}
exports.UpdateManyBookingListDto = UpdateManyBookingListDto;
__decorate([
    (0, validation_decorator_1.IsArrayField)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], UpdateManyBookingListDto.prototype, "id", void 0);
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], UpdateManyBookingListDto.prototype, "status", void 0);
//# sourceMappingURL=params-booking_list.dto.js.map