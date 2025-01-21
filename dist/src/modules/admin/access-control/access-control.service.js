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
exports.AccessControlService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../provider/prisma/prisma.service");
let AccessControlService = class AccessControlService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async can(role_id, resource, action) {
        console.log('role_id', role_id);
        console.log('resource', resource);
        console.log('action', action);
        const permission = await this.prisma.role_permission.findFirst({
            where: {
                role_id,
                resource: {
                    name: resource,
                },
                action: {
                    name: action,
                },
            },
        });
        return permission?.granted ?? false;
    }
    async grantPermission(role_id, resource, action) {
        await this.updatePermission(role_id, resource, action, true);
    }
    async revokePermission(role_id, resource, action) {
        await this.updatePermission(role_id, resource, action, false);
    }
    async updatePermission(role_id, resource, action, granted) {
        const resourceRecord = await this.prisma.resource.findUnique({
            where: { name: resource },
        });
        const actionRecord = await this.prisma.action.findUnique({
            where: { name: action },
        });
        if (!resourceRecord || !actionRecord) {
            throw new Error('Invalid resource or action');
        }
        await this.prisma.role_permission.upsert({
            where: {
                role_id_resource_id_action_id: {
                    role_id,
                    resource_id: resourceRecord.id,
                    action_id: actionRecord.id,
                },
            },
            update: {
                granted,
            },
            create: {
                role_id,
                resource_id: resourceRecord.id,
                action_id: actionRecord.id,
                granted,
            },
        });
    }
};
exports.AccessControlService = AccessControlService;
exports.AccessControlService = AccessControlService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccessControlService);
//# sourceMappingURL=access-control.service.js.map