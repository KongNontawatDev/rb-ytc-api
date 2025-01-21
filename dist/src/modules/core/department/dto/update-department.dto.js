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
exports.UpdateDepartmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_department_dto_1 = require("./create-department.dto");
const validation_decorator_1 = require("../../../../common/validation/validation.decorator");
class UpdateDepartmentDto extends (0, swagger_1.PartialType)(create_department_dto_1.CreateDepartmentDto) {
}
exports.UpdateDepartmentDto = UpdateDepartmentDto;
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    __metadata("design:type", Number)
], UpdateDepartmentDto.prototype, "id", void 0);
__decorate([
    (0, validation_decorator_1.IsInteger)(),
    __metadata("design:type", Number)
], UpdateDepartmentDto.prototype, "status", void 0);
//# sourceMappingURL=update-department.dto.js.map