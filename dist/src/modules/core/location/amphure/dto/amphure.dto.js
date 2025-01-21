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
exports.AmphureDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AmphureDto {
}
exports.AmphureDto = AmphureDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'รหัสอำเภอ', }),
    __metadata("design:type", Number)
], AmphureDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'รหัสของตาราง province (จังหวัด)', }),
    __metadata("design:type", Number)
], AmphureDto.prototype, "province_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ชื่ออำเภอ', }),
    __metadata("design:type", String)
], AmphureDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'สร้างข้อมูลเมื่อ', }),
    __metadata("design:type", Date)
], AmphureDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'แก้ไขล่าสุดเมื่อ', }),
    __metadata("design:type", Date)
], AmphureDto.prototype, "updated_at", void 0);
//# sourceMappingURL=amphure.dto.js.map