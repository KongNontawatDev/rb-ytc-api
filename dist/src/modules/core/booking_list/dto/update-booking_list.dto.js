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
exports.UpdateStatusBookingListDto = exports.UpdateBookingListDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const validation_decorator_1 = require("../../../../common/validation/validation.decorator");
const create_booking_list_dto_1 = require("./create-booking_list.dto");
class UpdateBookingListDto extends (0, swagger_1.PartialType)(create_booking_list_dto_1.CreateBookingListDto) {
}
exports.UpdateBookingListDto = UpdateBookingListDto;
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], UpdateBookingListDto.prototype, "id", void 0);
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], UpdateBookingListDto.prototype, "status", void 0);
class UpdateStatusBookingListDto {
}
exports.UpdateStatusBookingListDto = UpdateStatusBookingListDto;
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], UpdateStatusBookingListDto.prototype, "status", void 0);
//# sourceMappingURL=update-booking_list.dto.js.map