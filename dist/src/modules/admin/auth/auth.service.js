"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../../../provider/prisma/prisma.service");
const jwt_auth_service_1 = require("../../../provider/jwt/jwt-auth.service");
const mailer_service_1 = require("../../../provider/mailer/mailer.service");
let AuthService = class AuthService {
    constructor(prisma, jwtAuthService, mailService) {
        this.prisma = prisma;
        this.jwtAuthService = jwtAuthService;
        this.mailService = mailService;
    }
    async signUp(dto) {
        const adminExists = await this.prisma.admin.findUnique({
            where: { email: dto.email },
        });
        if (adminExists) {
            throw new common_1.BadRequestException('admin already exists');
        }
        const hashedPassword = await this.hashData(dto.password);
        const admin = await this.prisma.admin.create({
            data: {
                email: dto.email,
                name: dto.name,
                image: 'default.png',
                status: 1,
                role_id: dto.role_id,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                image: true,
                name: true,
                role_id: true,
                status: true,
                created_at: true,
                updated_at: true,
            },
        });
        const tokens = await this.jwtAuthService.getTokensAdmin(admin.email, admin.id);
        return {
            ...tokens,
            ...admin,
        };
    }
    async signIn(body) {
        const { email, password } = body;
        const admin = await this.prisma.admin.findUnique({ where: { email } });
        if (!admin) {
            throw new common_1.BadRequestException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง! โปรดลองอีกครั้ง');
        }
        const passwordMatches = await bcrypt.compare(password, admin.password);
        if (!passwordMatches) {
            throw new common_1.BadRequestException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง! โปรดลองอีกครั้ง');
        }
        const tokens = await this.jwtAuthService.getTokensAdmin(email, admin.id);
        const hashedRefreshToken = await this.hashData(tokens.refreshToken);
        const data = await this.prisma.admin.update({
            where: { id: admin.id },
            data: { refresh_token: hashedRefreshToken },
            select: {
                id: true,
                email: true,
                image: true,
                name: true,
                role_id: true,
                status: true,
            },
        });
        return {
            ...data,
            ...tokens,
        };
    }
    async refreshToken(oldRefreshToken) {
        const payload = this.jwtAuthService.decodeToken(oldRefreshToken);
        if (!payload) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const admin = await this.prisma.admin.findUnique({
            where: { id: payload.sub },
        });
        if (!admin || !admin.refresh_token) {
            throw new common_1.UnauthorizedException('Unauthorized');
        }
        const refreshTokenMatches = await bcrypt.compare(oldRefreshToken, admin.refresh_token);
        if (!refreshTokenMatches) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const tokens = await this.jwtAuthService.getTokensAdmin(admin.email, admin.id);
        const hashedNewRefreshToken = await this.hashData(tokens.refreshToken);
        await this.prisma.admin.update({
            where: { id: admin.id },
            data: { refresh_token: hashedNewRefreshToken },
        });
        return tokens;
    }
    async forgotPassword(dto) {
        const admin = await this.prisma.admin.findUnique({
            where: { email: dto.email },
        });
        if (!admin) {
            throw new common_1.BadRequestException('This email is not registered.');
        }
        const reset_token = admin.email + Date.now();
        const saltRounds = 10;
        const hashed_token = await bcrypt.hash(reset_token, saltRounds);
        const reset_token_expiry = new Date(Date.now() + 3600000);
        await this.prisma.admin.update({
            where: { id: admin.id },
            data: {
                reset_token: hashed_token,
                reset_token_expiry,
            },
        });
        await this.mailService.sendPasswordResetEmail(admin.email, hashed_token);
        return { hashed_token };
    }
    async resetPassword(dto) {
        const admin = await this.prisma.admin.findFirst({
            where: {
                reset_token: dto.token,
                reset_token_expiry: {
                    gt: new Date(),
                },
            },
        });
        if (!admin) {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
        const hashedPassword = await this.hashData(dto.newPassword);
        await this.prisma.admin.update({
            where: { id: admin.id },
            data: {
                password: hashedPassword,
                reset_token: null,
                reset_token_expiry: null,
            },
        });
    }
    async changePassword(adminId, dto) {
        const admin = await this.prisma.admin.findUnique({
            where: { id: adminId },
        });
        const passwordMatches = await bcrypt.compare(dto.currentPassword, admin?.password);
        if (!passwordMatches) {
            throw new common_1.BadRequestException('Current password is incorrect');
        }
        const hashedPassword = await this.hashData(dto.newPassword);
        await this.prisma.admin.update({
            where: { id: adminId },
            data: { password: hashedPassword },
        });
    }
    async logout(adminId) {
        await this.prisma.admin.update({
            where: { id: adminId },
            data: { refresh_token: null },
        });
    }
    async hashData(data) {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(data, salt);
    }
    async sendLoginLink(email) {
        const existingUser = await this.prisma.admin.findFirst({
            where: { email },
            select: { id: true, email: true },
        });
        if (!existingUser) {
            throw new common_1.BadRequestException('This email is not registered.');
        }
        const token = this.jwtAuthService.getTokensAdmin(email);
        await this.jwtAuthService.getTokensAdmin(email, existingUser.id);
        await this.mailService.sendLoginEmail(email, (await token).accessToken);
        return 'Login link sent to your email.';
    }
    async validateToken(token) {
        try {
            const tokenRes = await this.jwtAuthService.validateToken(token);
            if (tokenRes) {
                const newToken = await this.jwtAuthService.getTokensAdmin(tokenRes.context);
                const hashedRefreshToken = await this.hashData(newToken.refreshToken);
                const data = await this.prisma.admin.update({
                    where: { email: tokenRes.context },
                    data: { refresh_token: hashedRefreshToken },
                    select: {
                        id: true,
                        email: true,
                        image: true,
                        name: true,
                        role_id: true,
                        status: true,
                    },
                });
                return {
                    ...data,
                    ...newToken
                };
            }
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid or expired token.');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_auth_service_1.JwtAuthService,
        mailer_service_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map