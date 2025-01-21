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
exports.ChangePasswordFromOtherDto = exports.ChangePasswordFromOwnerDto = exports.ResetPasswordDto = exports.ForgotPasswordDto = exports.SignUpDto = exports.SignInDto = void 0;
const validation_decorator_1 = require("../../../../common/validation/validation.decorator");
class SignInDto {
}
exports.SignInDto = SignInDto;
__decorate([
    (0, validation_decorator_1.IsValidEmail)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], SignInDto.prototype, "email", void 0);
__decorate([
    (0, validation_decorator_1.IsValidString)(),
    (0, validation_decorator_1.IsRequiredField)('รหัสผ่าน'),
    __metadata("design:type", String)
], SignInDto.prototype, "password", void 0);
class SignUpDto {
}
exports.SignUpDto = SignUpDto;
__decorate([
    (0, validation_decorator_1.IsValidEmail)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
__decorate([
    (0, validation_decorator_1.IsValidString)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "name", void 0);
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], SignUpDto.prototype, "role_id", void 0);
__decorate([
    (0, validation_decorator_1.IsPassword)(8, 20),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
class ForgotPasswordDto {
}
exports.ForgotPasswordDto = ForgotPasswordDto;
__decorate([
    (0, validation_decorator_1.IsValidEmail)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);
class ResetPasswordDto {
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, validation_decorator_1.IsValidString)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
__decorate([
    (0, validation_decorator_1.IsPassword)(8, 20),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "newPassword", void 0);
class ChangePasswordFromOwnerDto {
}
exports.ChangePasswordFromOwnerDto = ChangePasswordFromOwnerDto;
__decorate([
    (0, validation_decorator_1.IsValidString)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], ChangePasswordFromOwnerDto.prototype, "currentPassword", void 0);
__decorate([
    (0, validation_decorator_1.IsPassword)(8, 20),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], ChangePasswordFromOwnerDto.prototype, "newPassword", void 0);
class ChangePasswordFromOtherDto {
}
exports.ChangePasswordFromOtherDto = ChangePasswordFromOtherDto;
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], ChangePasswordFromOtherDto.prototype, "id", void 0);
__decorate([
    (0, validation_decorator_1.IsValidString)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], ChangePasswordFromOtherDto.prototype, "currentPassword", void 0);
__decorate([
    (0, validation_decorator_1.IsPassword)(8, 20),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", String)
], ChangePasswordFromOtherDto.prototype, "newPassword", void 0);
//# sourceMappingURL=auth.dto.js.map