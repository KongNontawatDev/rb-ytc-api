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
exports.DeleteManyAmphureDto = exports.UpdateAmphureDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_amphure_dto_1 = require("./create-amphure.dto");
const class_validator_1 = require("class-validator");
const validation_decorator_1 = require("../../../../../common/validation/validation.decorator");
class UpdateAmphureDto extends (0, swagger_1.PartialType)(create_amphure_dto_1.CreateAmphureDto) {
}
exports.UpdateAmphureDto = UpdateAmphureDto;
__decorate([
    (0, class_validator_1.IsInt)({ message: 'id ต้องเป็นตัวเลขเท่านั้น' }),
    (0, swagger_1.ApiProperty)({
        description: 'รหัสอำเภอ',
        example: 2,
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], UpdateAmphureDto.prototype, "id", void 0);
class DeleteManyAmphureDto {
}
exports.DeleteManyAmphureDto = DeleteManyAmphureDto;
__decorate([
    (0, validation_decorator_1.IsArrayField)('รหัสอำเภอ'),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, swagger_1.ApiProperty)({
        description: 'รหัสอำเภอ',
        example: [1, 2, 5, 8],
        required: true,
        type: 'array',
    }),
    __metadata("design:type", Array)
], DeleteManyAmphureDto.prototype, "id", void 0);
//# sourceMappingURL=update-amphure.dto.js.map