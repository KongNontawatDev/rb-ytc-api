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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const update_admin_dto_1 = require("./dto/update-admin.dto");
const platform_express_1 = require("@nestjs/platform-express");
const file_service_1 = require("../../../common/utils/file/file.service");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const params_admin_dto_1 = require("./dto/params-admin.dto");
const file_config_1 = require("../../../common/utils/file/file.config");
const jwt_auth_guard_1 = require("../../../provider/jwt/guards/jwt-auth.guard");
let AdminController = class AdminController {
    constructor(adminService, fileService) {
        this.adminService = adminService;
        this.fileService = fileService;
    }
    async create(body, file) {
        try {
            const data = await this.adminService.create(body, file);
            return {
                message: 'เพิ่มข้อมูลแอดมิน',
                error: 0,
                data,
            };
        }
        catch (error) {
            if (file) {
                await this.fileService.deleteFiles(file.path);
            }
            throw error;
        }
    }
    async findByCondition(query) {
        const result = await this.adminService.findByCondition(query);
        const meta = {
            page: Number(query.page),
            pageSize: Number(query.pageSize),
            pageCount: result.pageCount,
            total: result.total,
        };
        return {
            message: 'เรียกดูข้อมูลแอดมินทั้งหมด',
            ...(meta && { meta }),
            error: 0,
            data: result.data,
        };
    }
    async findAll() {
        const data = await this.adminService.findAll();
        return {
            message: 'เรียกดูข้อมูลแอดมินทั้งหมด',
            error: 0,
            data,
        };
    }
    async findOne(params) {
        const data = await this.adminService.findOne(+params.id);
        return {
            message: 'เรียกดูข้อมูลแอดมินตามรหัส',
            error: 0,
            data,
        };
    }
    async update(id, body, file) {
        const data = await this.adminService.update(+id, body, file);
        return {
            message: 'แก้ไขข้อมูลแอดมินตามรหัส',
            error: 0,
            data,
        };
    }
    async remove(id) {
        const data = await this.adminService.remove(+id);
        return {
            message: 'ลบข้อมูลแอดมินตามรหัส',
            error: 0,
            data,
        };
    }
    async removeMany(body) {
        const data = await this.adminService.removeMany(body.id);
        return {
            message: 'ลบข้อมูลแอดมินหลายแถว',
            error: 0,
            data,
        };
    }
    async updateStatusOne(id, body) {
        const data = await this.adminService.updateStatusOne(+id, body);
        return {
            message: 'แก้ไขแอดมินตามรหัส',
            error: 0,
            data,
        };
    }
    async updateStatusMany(body) {
        const data = await this.adminService.updateStatusMany(body.id, body.status);
        return {
            message: 'เปลี่ยนสถานะแอดมินหลายแถว',
            error: 0,
            data,
        };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, file_config_1.fileUploadOptions)({
        destination: './public/admin',
        maxFileSize: 5_000_000,
        mimeTypes: [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/svg+xml',
            'image/jpg',
        ],
    }))),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_admin_dto_1.FindAdminsByConditionQueryDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findByCondition", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_admin_dto_1.FindOneAdminParamDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, file_config_1.fileUploadOptions)({
        destination: './public/admin',
        maxFileSize: 5_000_000,
        mimeTypes: [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/svg+xml',
            'image/jpg',
        ],
    }))),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_admin_dto_1.UpdateAdminDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('delete-many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_admin_dto_1.DeleteManyAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "removeMany", null);
__decorate([
    (0, common_1.Patch)('update/status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_admin_dto_1.UpdateStatusAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateStatusOne", null);
__decorate([
    (0, common_1.Post)('update-status-many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_admin_dto_1.UpdateManyAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateStatusMany", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)({
        path: 'admin/admin',
        version: ['1'],
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        file_service_1.FileService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map