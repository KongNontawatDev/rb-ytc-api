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
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const access_control_service_1 = require("../access-control.service");
const prisma_service_1 = require("../../../../provider/prisma/prisma.service");
const uuid_1 = require("uuid");
const logger_service_1 = require("../../../../common/logger/logger.service");
let PermissionGuard = class PermissionGuard {
    constructor(reflector, accessControl, prisma, logger) {
        this.reflector = reflector;
        this.accessControl = accessControl;
        this.prisma = prisma;
        this.logger = logger;
        this.errorMessage = 'คุณไม่ได้รับอนุญาติให้กระทำสิ่งนี้';
    }
    logAndThrowError(request, startTime, requestId) {
        const duration = Date.now() - startTime;
        this.logger.error(this.errorMessage, {
            requestId,
            method: request.method,
            url: request.url,
            requestBody: request.body,
            requestHeaders: request.headers,
            errorMessage: this.errorMessage,
            errorStack: this.errorMessage,
            statusCode: common_1.HttpStatus.FORBIDDEN,
            duration: `${duration}ms`,
            status: 'error',
        });
        throw new common_1.ForbiddenException(this.errorMessage);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const requestId = (0, uuid_1.v4)();
        const startTime = Date.now();
        const resource = this.reflector.get('resource', context.getHandler());
        const action = this.reflector.get('action', context.getHandler());
        if (!resource || !action) {
            return true;
        }
        const admin = request.admin;
        if (!admin?.userId) {
            this.logAndThrowError(request, startTime, requestId);
        }
        const userWithRole = await this.prisma.admin.findUnique({
            where: { id: admin.userId },
            select: { role_id: true },
        });
        if (!userWithRole?.role_id) {
            this.logAndThrowError(request, startTime, requestId);
        }
        const hasPermission = await this.accessControl.can(userWithRole.role_id, resource, action);
        if (!hasPermission) {
            this.logAndThrowError(request, startTime, requestId);
        }
        return true;
    }
};
exports.PermissionGuard = PermissionGuard;
exports.PermissionGuard = PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        access_control_service_1.AccessControlService,
        prisma_service_1.PrismaService,
        logger_service_1.LoggerService])
], PermissionGuard);
//# sourceMappingURL=permission.guard.js.map