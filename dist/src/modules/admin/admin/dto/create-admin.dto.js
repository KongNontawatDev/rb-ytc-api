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
exports.CreateAdminDto = void 0;
const validation_decorator_1 = require("../../../../common/validation/validation.decorator");
class CreateAdminDto {
}
exports.CreateAdminDto = CreateAdminDto;
__decorate([
    (0, validation_decorator_1.IsValidString)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "name", void 0);
__decorate([
    (0, validation_decorator_1.IsValidEmail)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "email", void 0);
__decorate([
    (0, validation_decorator_1.IsPassword)(8, 20),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "password", void 0);
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], CreateAdminDto.prototype, "role_id", void 0);
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    __metadata("design:type", Object)
], CreateAdminDto.prototype, "image", void 0);
//# sourceMappingURL=create-admin.dto.js.map