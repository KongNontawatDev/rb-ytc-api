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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const public_decorator_1 = require("../../../common/decorators/public.decorator");
const logger_service_1 = require("../../../common/logger/logger.service");
const uuid_1 = require("uuid");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector, logger) {
        super();
        this.reflector = reflector;
        this.logger = logger;
        this.errorMessage = 'ต้องล็อคอินเข้าสู่ระบบก่อน';
    }
    logAuthError(request) {
        const requestId = (0, uuid_1.v4)();
        const startTime = Date.now();
        const duration = Date.now() - startTime;
        this.logger.error(this.errorMessage, {
            requestId,
            method: request.method,
            url: request.url,
            requestBody: request.body,
            requestHeaders: request.headers,
            errorMessage: this.errorMessage,
            errorStack: this.errorMessage,
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
            duration: `${duration}ms`,
            status: 'error',
        });
    }
    canActivate(context) {
        this.context = context;
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
    handleRequest(err, user) {
        if (err || !user) {
            const request = this.context.switchToHttp().getRequest();
            this.logAuthError(request);
            throw new common_1.UnauthorizedException(this.errorMessage);
        }
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        logger_service_1.LoggerService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map