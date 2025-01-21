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
exports.ProvinceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProvinceDto {
}
exports.ProvinceDto = ProvinceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'รหัส', }),
    __metadata("design:type", Number)
], ProvinceDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ชื่อ', }),
    __metadata("design:type", String)
], ProvinceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'สร้างข้อมูลเมื่อ', }),
    __metadata("design:type", Date)
], ProvinceDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'แก้ไขล่าสุดเมื่อ', }),
    __metadata("design:type", Date)
], ProvinceDto.prototype, "updated_at", void 0);
//# sourceMappingURL=province.dto.js.map