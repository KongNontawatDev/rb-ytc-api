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
const file_config_1 = require("../../../common/utils/file/file.config");
const user_service_1 = require("../../core/user/user.service");
const params_user_dto_1 = require("../../core/user/dto/params-user.dto");
const update_user_dto_1 = require("../../core/user/dto/update-user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findOne(params) {
        const data = await this.userService.findOne(+params.id);
        return {
            message: 'เรียกดูข้อมูลผู้ใช้ตามรหัส',
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
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_user_dto_1.FindOneUserParamDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
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
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)({
        path: 'app/user',
        version: ['1'],
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map