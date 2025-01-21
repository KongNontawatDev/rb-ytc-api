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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const file_config_1 = require("../../../common/utils/file/file.config");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_service_1 = require("../../../provider/jwt/jwt-auth.service");
const user_service_1 = require("../../core/user/user.service");
const create_user_dto_1 = require("../../core/user/dto/create-user.dto");
let AuthController = class AuthController {
    constructor(authService, jwtAuthService, userService) {
        this.authService = authService;
        this.jwtAuthService = jwtAuthService;
        this.userService = userService;
    }
    async checkRegister(body) {
        const user = await this.authService.checkRegister(body.line_id);
        if (user) {
            const token = await this.jwtAuthService.getTokensUser(user.id, user.line_id);
            return {
                message: 'เคยลงทะเบียนแล้ว',
                error: 0,
                data: {
                    ...user,
                    token: token
                },
            };
        }
        else {
            throw new common_1.ForbiddenException('บัญชีนี้ยังไม่ลงทะเบียน ต้องลงทะเบียนก่อน');
        }
    }
    async register(body, file) {
        const user = await this.userService.create(body, file);
        if (user) {
            const token = await this.jwtAuthService.getTokensUser(user.id, user.line_id);
            return {
                message: 'ลงทะเบียนสำเร็จ',
                data: {
                    ...user,
                    token: token,
                },
            };
        }
        else {
            throw new common_1.BadRequestException('ลงทะเบียนไม่สำเร็จ');
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('check_register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkRegister", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, file_config_1.fileUploadOptions)({
        destination: './public/user',
        maxFileSize: 5_000_000,
        mimeTypes: ['image/jpeg', 'image/png'],
    }))),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)({
        path: 'app/auth',
        version: '1',
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_auth_service_1.JwtAuthService,
        user_service_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map