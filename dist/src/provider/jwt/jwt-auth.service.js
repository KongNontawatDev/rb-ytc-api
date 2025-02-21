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
exports.JwtAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtAuthService = class JwtAuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async getTokensAdmin(email, adminId) {
        const payload = { context: email, actor: 'admin' };
        if (adminId) {
            payload.sub = adminId;
        }
        const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' });
        const refreshPayload = adminId ? { sub: adminId } : {};
        const refreshToken = this.jwtService.sign(refreshPayload, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }
    decodeToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch {
            return null;
        }
    }
    async getTokensUser(userId, line_id) {
        const payload = { sub: userId, context: line_id, actor: 'user' };
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1h',
        });
    }
    async validateToken(token) {
        try {
            const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            return decoded;
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid or expired token.');
        }
    }
};
exports.JwtAuthService = JwtAuthService;
exports.JwtAuthService = JwtAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtAuthService);
//# sourceMappingURL=jwt-auth.service.js.map