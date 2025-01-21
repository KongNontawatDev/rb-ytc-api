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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../../../common/decorators/public.decorator");
const jwt_auth_guard_1 = require("../../../provider/jwt/guards/jwt-auth.guard");
const department_service_1 = require("../../core/department/department.service");
const create_department_dto_1 = require("../../core/department/dto/create-department.dto");
const params_department_dto_1 = require("../../core/department/dto/params-department.dto");
const update_department_dto_1 = require("../../core/department/dto/update-department.dto");
let DepartmentController = class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    async create(body) {
        const data = await this.departmentService.create(body);
        return {
            message: 'เพิ่มข้อมูลแผนก/ฝ่ายงาน',
            error: 0,
            data,
        };
    }
    async findByCondition(query) {
        const hasQueryParams = query.textSearch ||
            query.searchField ||
            query.page ||
            query.pageSize ||
            query.sortField ||
            query.sortOrder;
        let result;
        if (hasQueryParams) {
            result = await this.departmentService.findByCondition(query);
        }
        else {
            const departments = await this.departmentService.findAll();
            result = { data: departments };
        }
        if (result) {
            return {
                message: 'เรียกดูข้อมูลผู้ใช้ทั้งหมด',
                ...(hasQueryParams && {
                    meta: {
                        page: Number(query.page) || 1,
                        pageSize: Number(query.pageSize) || 10,
                        pageCount: result.pageCount,
                        total: result.total,
                    },
                }),
                error: 0,
                data: result.data,
            };
        }
    }
    async findAll() {
        return await this.departmentService.findAll();
    }
    async findOne(params) {
        const data = await this.departmentService.findOne(+params.id);
        return {
            message: 'เรียกดูข้อมูลแผนก/ฝ่ายงานตามรหัส',
            error: 0,
            data,
        };
    }
    async findForDropdown() {
        const data = await this.departmentService.findForDropdown();
        return {
            message: 'เรียกดูข้อมูลแผนก/ฝ่ายงานแสดงที่ dropdown',
            error: 0,
            data,
        };
    }
    async update(id, body) {
        const data = await this.departmentService.update(+id, body);
        return {
            message: 'แก้ไขข้อมูลแผนก/ฝ่ายงานตามรหัส',
            error: 0,
            data,
        };
    }
    async remove(id) {
        const data = await this.departmentService.remove(+id);
        return {
            message: 'ลบข้อมูลแผนก/ฝ่ายงานตามรหัส',
            error: 0,
            data,
        };
    }
    async removeMany(body) {
        const data = await this.departmentService.removeMany(body.id);
        return {
            message: 'ลบข้อมูลแผนก/ฝ่ายงานตามรหัสที่เลือก',
            error: 0,
            data,
        };
    }
    async updateStatusOne(id, body) {
        const data = await this.departmentService.updateStatusOne(+id, body);
        return {
            message: 'แก้ไขสถานะแผนก/ฝ่ายงานตามรหัส',
            error: 0,
            data,
        };
    }
    async updateStatusMany(body) {
        const data = await this.departmentService.updateStatusMany(body.id, body.status);
        return {
            message: 'เปลี่ยนสถานะแผนก/ฝ่ายงานหลายแถว',
            error: 0,
            data,
        };
    }
};
exports.DepartmentController = DepartmentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_department_dto_1.FindDepartmentsByConditionQueryDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "findByCondition", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_department_dto_1.FindOneDepartmentParamDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/list/dropdown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "findForDropdown", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_department_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('delete-many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_department_dto_1.DeleteManyDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "removeMany", null);
__decorate([
    (0, common_1.Patch)('update/status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, params_department_dto_1.UpdateStatusDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "updateStatusOne", null);
__decorate([
    (0, common_1.Post)('update-status-many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_department_dto_1.UpdateManyDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "updateStatusMany", null);
exports.DepartmentController = DepartmentController = __decorate([
    (0, common_1.Controller)({
        path: 'admin/department',
        version: ['1'],
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], DepartmentController);
//# sourceMappingURL=department.controller.js.map