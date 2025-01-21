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
exports.AccessControlController = void 0;
const common_1 = require("@nestjs/common");
const access_control_service_1 = require("./access-control.service");
const permission_guard_1 = require("./guards/permission.guard");
let AccessControlController = class AccessControlController {
    constructor(accessControl) {
        this.accessControl = accessControl;
    }
    async grantPermission(body) {
        await this.accessControl.grantPermission(body.role_id, body.resource, body.action);
        return { message: 'Permission granted successfully' };
    }
    async revokePermission(body) {
        await this.accessControl.revokePermission(body.role_id, body.resource, body.action);
        return { message: 'Permission revoked successfully' };
    }
    async checkPermission(role_id, resource, action) {
        const hasPermission = await this.accessControl.can(Number(role_id), resource, action);
        return { hasPermission };
    }
};
exports.AccessControlController = AccessControlController;
__decorate([
    (0, common_1.Post)('grant'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccessControlController.prototype, "grantPermission", null);
__decorate([
    (0, common_1.Post)('revoke'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccessControlController.prototype, "revokePermission", null);
__decorate([
    (0, common_1.Get)('check/:role_id/:resource/:action'),
    __param(0, (0, common_1.Param)('role_id')),
    __param(1, (0, common_1.Param)('resource')),
    __param(2, (0, common_1.Param)('action')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AccessControlController.prototype, "checkPermission", null);
exports.AccessControlController = AccessControlController = __decorate([
    (0, common_1.Controller)({
        path: 'admin/access-control',
        version: '1'
    }),
    (0, common_1.UseGuards)(permission_guard_1.PermissionGuard),
    __metadata("design:paramtypes", [access_control_service_1.AccessControlService])
], AccessControlController);
//# sourceMappingURL=access-control.controller.js.map