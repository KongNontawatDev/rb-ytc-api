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
exports.CreateRoomDto = void 0;
const validation_decorator_1 = require("../../../../common/validation/validation.decorator");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateRoomDto {
}
exports.CreateRoomDto = CreateRoomDto;
__decorate([
    (0, validation_decorator_1.IsValidString)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "name", void 0);
__decorate([
    (0, validation_decorator_1.IsValidString)(),
    (0, validation_decorator_1.IsOptionalField)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "detail", void 0);
__decorate([
    (0, validation_decorator_1.IsValidString)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "location", void 0);
__decorate([
    (0, validation_decorator_1.IsValidString)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(9999),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "capacity", void 0);
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsValidString)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "accessorys", void 0);
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsArrayField)(),
    __metadata("design:type", Array)
], CreateRoomDto.prototype, "images", void 0);
//# sourceMappingURL=create-room.dto.js.map