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
const room_service_1 = require("../../core/room/room.service");
const params_room_dto_1 = require("../../core/room/dto/params-room.dto");
let RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
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
    async findRoomEmpty() {
        const data = await this.roomService.findRoomEmpty();
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
};
exports.RoomController = RoomController;
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
    (0, common_1.Get)('/status/empty'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "findRoomEmpty", null);
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
exports.RoomController = RoomController = __decorate([
    (0, common_1.Controller)({
        path: 'app/room',
        version: ['1'],
    }),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomController);
//# sourceMappingURL=room.controller.js.map