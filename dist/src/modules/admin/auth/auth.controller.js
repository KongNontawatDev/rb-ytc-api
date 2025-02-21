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
const auth_dto_1 = require("./dto/auth.dto");
const jwt_auth_guard_1 = require("../../../provider/jwt/guards/jwt-auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(dto) {
        const data = await this.authService.signIn(dto);
        return {
            message: 'เข้าสู่ระบบสำเร็จ',
            error: 0,
            data,
        };
    }
    async signUp(dto) {
        const data = await this.authService.signUp(dto);
        return {
            message: 'สมัครสมาชิกสำเร็จ',
            error: 0,
            data,
        };
    }
    async forgotPassword(dto) {
        const data = await this.authService.forgotPassword(dto);
        return {
            message: 'ลืมรหัสผ่าน - ขอเปลี่ยนรหัสผ่าน',
            error: 0,
            data,
        };
    }
    async resetPassword(dto) {
        await this.authService.resetPassword(dto);
        return {
            message: 'รีเช็ทรหัสผ่านสำเร็จ',
            error: 0,
            data: {},
        };
    }
    async changePasswordFormOwner(req, dto) {
        await this.authService.changePassword(req.user.userId, dto);
        return {
            message: 'เปลี่ยนรหัสผ่านสำเร็จ',
            error: 0,
            data: {},
        };
    }
    async changePasswordFromOther(body) {
        const { id, ...bodyData } = body;
        await this.authService.changePassword(id, bodyData);
        return {
            message: 'เปลี่ยนรหัสผ่านสำเร็จ',
            error: 0,
            data: {},
        };
    }
    async refreshToken(refreshToken) {
        const data = await this.authService.refreshToken(refreshToken);
        return {
            message: 'รีเฟรช Token',
            error: 0,
            data,
        };
    }
    async logout(adminId) {
        const data = await this.authService.logout(adminId);
        return {
            message: 'ออกจากระบบสำเร็จ',
            error: 0,
            data,
        };
    }
    async loginWithEmail(email) {
        const data = await this.authService.sendLoginLink(email);
        return {
            message: 'ส่งเมลเข้าสู่ระบบแล้ว',
            error: 0,
            data,
        };
    }
    async validateLoginWithEmail(token) {
        const data = await this.authService.validateToken(token);
        return {
            message: 'ตรวจสอบ Token แล้ว',
            error: 0,
            data,
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('change-password/owner'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.ChangePasswordFromOwnerDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePasswordFormOwner", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('change-password/other'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ChangePasswordFromOtherDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePasswordFromOther", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Body)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Body)('adminId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('login-with-email'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginWithEmail", null);
__decorate([
    (0, common_1.Post)('validate-login-with-email'),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateLoginWithEmail", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)({
        path: 'admin/auth',
        version: '1',
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map