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
exports.UpdateStatusAdminDto = exports.UpdateAdminDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_admin_dto_1 = require("./create-admin.dto");
const validation_decorator_1 = require("../../../../common/validation/validation.decorator");
class UpdateAdminDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_admin_dto_1.CreateAdminDto, ['image'])) {
}
exports.UpdateAdminDto = UpdateAdminDto;
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], UpdateAdminDto.prototype, "id", void 0);
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], UpdateAdminDto.prototype, "status", void 0);
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    (0, validation_decorator_1.IsValidString)(),
    __metadata("design:type", Object)
], UpdateAdminDto.prototype, "image", void 0);
__decorate([
    (0, validation_decorator_1.IsOptionalField)(),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "password", void 0);
class UpdateStatusAdminDto {
}
exports.UpdateStatusAdminDto = UpdateStatusAdminDto;
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    (0, validation_decorator_1.IsRequiredField)(),
    __metadata("design:type", Number)
], UpdateStatusAdminDto.prototype, "status", void 0);
//# sourceMappingURL=update-admin.dto.js.map