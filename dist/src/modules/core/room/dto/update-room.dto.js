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
exports.UpdateStatusRoomDto = exports.UpdateRoomDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_room_dto_1 = require("./create-room.dto");
const validation_decorator_1 = require("../../../../common/validation/validation.decorator");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UpdateRoomDto extends (0, swagger_1.PartialType)(create_room_dto_1.CreateRoomDto) {
}
exports.UpdateRoomDto = UpdateRoomDto;
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateRoomDto.prototype, "id", void 0);
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(2),
    __metadata("design:type", Number)
], UpdateRoomDto.prototype, "status", void 0);
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsArrayField)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateRoomDto.prototype, "removeImages", void 0);
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsArrayField)(),
    __metadata("design:type", Array)
], UpdateRoomDto.prototype, "images", void 0);
class UpdateStatusRoomDto {
}
exports.UpdateStatusRoomDto = UpdateStatusRoomDto;
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], UpdateStatusRoomDto.prototype, "status", void 0);
//# sourceMappingURL=update-room.dto.js.map