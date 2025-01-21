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
exports.CreateProvinceDto = void 0;
const base_dto_1 = require("../../../../../common/dto/base.dto");
const validation_decorator_1 = require("../../../../../common/validation/validation.decorator");
const swagger_1 = require("@nestjs/swagger");
class CreateProvinceDto extends base_dto_1.BaseDto {
}
exports.CreateProvinceDto = CreateProvinceDto;
__decorate([
    (0, validation_decorator_1.IsValidString)('ชื่อจังหวัด'),
    (0, validation_decorator_1.IsRequiredField)('ชื่อจังหวัด'),
    (0, swagger_1.ApiProperty)({ description: 'ชื่อจังหวัด' }),
    __metadata("design:type", String)
], CreateProvinceDto.prototype, "name", void 0);
//# sourceMappingURL=create-province.dto.js.map