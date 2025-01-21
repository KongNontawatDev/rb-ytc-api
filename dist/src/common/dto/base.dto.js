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
exports.BaseQueryDto = exports.BaseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class BaseDto {
}
exports.BaseDto = BaseDto;
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseDto.prototype, "sub", void 0);
class BaseQueryDto {
    constructor() {
        this.textSearch = '';
        this.searchField = '';
        this.page = '1';
        this.pageSize = '10';
        this.sortField = 'id';
        this.sortOrder = 'desc';
    }
}
exports.BaseQueryDto = BaseQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: 'Search text (comma-separated for multiple values)', required: false }),
    __metadata("design:type", String)
], BaseQueryDto.prototype, "textSearch", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: 'Fields to search in (comma-separated for multiple fields)', required: false, example: 'id,name' }),
    __metadata("design:type", String)
], BaseQueryDto.prototype, "searchField", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)({ description: 'Page number', required: false, type: String, example: '1' }),
    __metadata("design:type", String)
], BaseQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Number of items per page',
        required: false,
        type: String,
        example: '10'
    }),
    __metadata("design:type", String)
], BaseQueryDto.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: 'Field to sort by', required: false, example: 'id' }),
    __metadata("design:type", String)
], BaseQueryDto.prototype, "sortField", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['asc', 'desc']),
    (0, swagger_1.ApiProperty)({
        description: 'Sort order',
        required: false,
        enum: ['asc', 'desc'],
        example: 'desc'
    }),
    __metadata("design:type", String)
], BaseQueryDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=base.dto.js.map