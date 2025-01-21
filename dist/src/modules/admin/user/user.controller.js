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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const file_service_1 = require("../../../common/utils/file/file.service");
const file_config_1 = require("../../../common/utils/file/file.config");
const jwt_auth_guard_1 = require("../../../provider/jwt/guards/jwt-auth.guard");
const user_service_1 = require("../../core/user/user.service");
const create_user_dto_1 = require("../../core/user/dto/create-user.dto");
const params_user_dto_1 = require("../../core/user/dto/params-user.dto");
const update_user_dto_1 = require("../../core/user/dto/update-user.dto");
let UserController = class UserController {
    constructor(userService, fileService) {
        this.userService = userService;
        this.fileService = fileService;
    }
    async create(body, file) {
        try {
            const data = await this.userService.create(body, file);
            return {
                message: 'เพิ่มข้อมูลผู้ใช้',
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
        const result = await this.userService.findByCondition(query);
        const meta = {
            page: Number(query.page),
            pageSize: Number(query.pageSize),
            pageCount: result.pageCount,
            total: result.total,
        };
        return {
            message: 'เรียกดูข้อมูลผู้ใช้ทั้งหมด',
            ...(meta && { meta }),
            error: 0,
            data: result.data,
        };
    }
    async findAll() {
        const data = await this.userService.findAll();
        return {
            message: 'เรียกดูข้อมูลผู้ใช้ทั้งหมด',
            error: 0,
            data,
        };
    }
    async findOne(params) {
        const data = await this.userService.findOne(+params.id);
        return {
            message: 'เรียกดูข้อมูลผู้ใช้ตามรหัส',
            error: 0,
            data,
        };
    }
    async findForDropdown() {
        const data = await this.userService.findForDropdown();
        return {
            message: 'เรียกดูข้อมูลผู้ใช้แสดงที่ dropdown',
            error: 0,
            data,
        };
    }
    async update(id, body, file) {
        const data = await this.userService.update(+id, body, file);
        return {
            message: 'แก้ไขข้อมูลผู้ใช้ตามรหัส',
            error: 0,
            data,
        };
    }
    async remove(id) {
        const data = await this.userService.remove(+id);
        return {
            message: 'ลบข้อมูลผู้ใช้ตามรหัส',
            error: 0,
            data,
        };
    }
    async removeMany(body) {
        const data = await this.userService.removeMany(body.id);
        return {
            message: 'ลบข้อมูลผู้ใช้หลายแถว',
            error: 0,
            data,
        };
    }
    async updateStatusOne(id, body) {
        const data = await this.userService.updateStatusOne(+id, body);
        return {
            message: 'แก้ไขสถานะแผนก/ฝ่ายงานตามรหัส',
            error: 0,
            data,
        };
    }
    async updateStatusMany(body) {
        const data = await this.userService.updateStatusMany(body.id, body.status);
        return {
            message: 'เปลี่ยนสถานะผู้ใช้หลายแถว',
            error: 0,
            data,
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, file_config_1.fileUploadOptions)({
        destination: './public/user',
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
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_user_dto_1.FindUsersByConditionQueryDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByCondition", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_user_dto_1.FindOneUserParamDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/list/dropdown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findForDropdown", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, file_config_1.fileUploadOptions)({
        destination: './public/user',
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
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('delete-many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_user_dto_1.DeleteManyUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeMany", null);
__decorate([
    (0, common_1.Patch)('update/status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateStatusUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateStatusOne", null);
__decorate([
    (0, common_1.Post)('update-status-many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_user_dto_1.UpdateManyUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateStatusMany", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)({
        path: 'admin/user',
        version: ['1'],
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [user_service_1.UserService,
        file_service_1.FileService])
], UserController);
//# sourceMappingURL=user.controller.js.map