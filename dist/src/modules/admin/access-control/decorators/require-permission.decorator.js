"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirePermission = RequirePermission;
const common_1 = require("@nestjs/common");
const permission_guard_1 = require("../guards/permission.guard");
const jwt_auth_guard_1 = require("../../../../provider/jwt/guards/jwt-auth.guard");
function RequirePermission(resource, action) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('resource', resource), (0, common_1.SetMetadata)('action', action), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard));
}
//# sourceMappingURL=require-permission.decorator.js.map