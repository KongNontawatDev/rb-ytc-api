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
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const file_service_1 = require("../../../common/utils/file/file.service");
const file_config_1 = require("../../../common/utils/file/file.config");
const jwt_auth_guard_1 = require("../../../provider/jwt/guards/jwt-auth.guard");
const room_service_1 = require("../../core/room/room.service");
const create_room_dto_1 = require("../../core/room/dto/create-room.dto");
const update_room_dto_1 = require("../../core/room/dto/update-room.dto");
const params_room_dto_1 = require("../../core/room/dto/params-room.dto");
const uploadsFilter_1 = require("../../../common/exceptions/uploadsFilter");
let RoomController = class RoomController {
    constructor(roomService, fileService) {
        this.roomService = roomService;
        this.fileService = fileService;
    }
    async create(body, files) {
        try {
            const data = await this.roomService.create(body, files);
            return {
                message: 'เพิ่มข้อมูลห้องและรูปภาพ',
                error: 0,
                data,
            };
        }
        catch (error) {
            if (files?.length) {
                await Promise.all(files.map((file) => this.fileService.deleteFiles(file.path)));
            }
            throw error;
        }
    }
    async update(id, body, files) {
        const data = await this.roomService.update(+id, body, files);
        return {
            message: 'แก้ไขข้อมูลห้องและรูปภาพ',
            error: 0,
            data,
        };
    }
    async findByCondition(query) {
        const result = await this.roomService.findByCondition(query);
        const meta = {
            page: Number(query.page),
            pageSize: Number(query.pageSize),
            pageCount: result.pageCount,
            total: result.total,
        };
        return {
            message: 'เรียกดูข้อมูลห้องทั้งหมด',
            ...(meta && { meta }),
            error: 0,
            data: result.data,
        };
    }
    async findAll() {
        const data = await this.roomService.findAll();
        return {
            message: 'เรียกดูข้อมูลห้องทั้งหมด',
            error: 0,
            data,
        };
    }
    async findOne(params) {
        const data = await this.roomService.findOne(+params.id);
        return {
            message: 'เรียกดูข้อมูลห้องตามรหัส',
            error: 0,
            data,
        };
    }
    async findForDropdown() {
        const data = await this.roomService.findForDropdown();
        return {
            message: 'เรียกดูข้อมูลห้องแสดงที่ dropdown',
            error: 0,
            data,
        };
    }
    async remove(id) {
        const data = await this.roomService.remove(+id);
        return {
            message: 'ลบข้อมูลห้องตามรหัส',
            error: 0,
            data,
        };
    }
    async removeMany(body) {
        const data = await this.roomService.removeMany(body.id);
        return {
            message: 'ลบข้อมูลห้องหลายแถว',
            error: 0,
            data,
        };
    }
    async updateStatusMany(body) {
        const data = await this.roomService.updateStatusMany(body.id, body.status);
        return {
            message: 'เปลี่ยนสถานะห้องหลายแถว',
            error: 0,
            data,
        };
    }
    async updateStatusOne(id, body) {
        const data = await this.roomService.updateStatusOne(+id, body);
        return {
            message: 'แก้ไขสถานะแผนก/ฝ่ายงานตามรหัส',
            error: 0,
            data,
        };
    }
};
exports.RoomController = RoomController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseFilters)(uploadsFilter_1.ValidationUploadExceptionFilter),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images[]', 10, (0, file_config_1.fileUploadOptions)({
        destination: './public/room',
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
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto, Array]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images[]', 10, (0, file_config_1.fileUploadOptions)({
        destination: './public/room',
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
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_room_dto_1.UpdateRoomDto, Array]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_room_dto_1.FindRoomsByConditionQueryDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "findByCondition", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_room_dto_1.FindOneRoomParamDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/list/dropdown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "findForDropdown", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('delete-many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_room_dto_1.DeleteManyRoomDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "removeMany", null);
__decorate([
    (0, common_1.Post)('update-status-many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_room_dto_1.UpdateManyRoomDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "updateStatusMany", null);
__decorate([
    (0, common_1.Patch)('update/status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_room_dto_1.UpdateStatusRoomDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "updateStatusOne", null);
exports.RoomController = RoomController = __decorate([
    (0, common_1.Controller)({
        path: 'admin/room',
        version: ['1'],
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [room_service_1.RoomService,
        file_service_1.FileService])
], RoomController);
//# sourceMappingURL=room.controller.js.map