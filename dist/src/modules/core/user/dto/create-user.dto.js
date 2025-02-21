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
exports.CreateUserDto = void 0;
const validation_decorator_1 = require("../../../../common/validation/validation.decorator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, validation_decorator_1.IsValidString)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "full_name", void 0);
__decorate([
    (0, validation_decorator_1.IsPhoneNumberField)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "tel", void 0);
__decorate([
    (0, validation_decorator_1.IsValidString)(),
    (0, validation_decorator_1.IsOptionalField)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "line_name", void 0);
__decorate([
    (0, validation_decorator_1.IsValidString)(),
    (0, validation_decorator_1.IsOptionalField)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "line_id", void 0);
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "department_id", void 0);
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "image", void 0);
//# sourceMappingURL=create-user.dto.js.map