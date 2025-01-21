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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../provider/prisma/prisma.service");
let RoleService = class RoleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const existingRole = await this.prisma.role.findUnique({
            where: { name: data.name },
        });
        if (existingRole) {
            throw new common_1.ConflictException(`Role with name ${data.name} already exists`);
        }
        return this.prisma.$transaction(async (tx) => {
            const role = await tx.role.create({
                data: {
                    name: data.name,
                    description: data.description,
                },
            });
            if (data.permissions?.length) {
                await this.assignPermissions(tx, role.id, data.permissions);
            }
            return role;
        });
    }
    async findAll() {
        return this.prisma.role.findMany({
            include: {
                permissions: {
                    include: {
                        resource: true,
                        action: true,
                    },
                },
            },
        });
    }
    async findByCondition(search, page = 1, pageSize = 20, sortField = 'id', sortOrder = 'desc') {
        const skip = (page - 1) * pageSize;
        const [total, roles] = await Promise.all([
            this.prisma.role.count({
                where: {
                    OR: [
                        { name: { contains: search } },
                        { description: { contains: search } },
                    ],
                },
            }),
            this.prisma.role.findMany({
                where: {
                    OR: [
                        { name: { contains: search } },
                        { description: { contains: search } },
                    ],
                },
                include: {
                    permissions: {
                        include: {
                            resource: true,
                            action: true,
                        },
                    },
                },
                skip,
                take: pageSize,
                orderBy: {
                    [sortField]: sortOrder,
                },
            }),
        ]);
        const pageCount = Math.ceil(total / pageSize);
        return {
            data: roles,
            pageCount,
            total,
        };
    }
    async findOne(id) {
        const role = await this.prisma.role.findUnique({
            where: { id },
            include: {
                permissions: {
                    include: {
                        resource: true,
                        action: true,
                    },
                },
            },
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID ${id} not found`);
        }
        return role;
    }
    async update(id, data) {
        await this.findOne(id);
        if (data.name) {
            const existingRole = await this.prisma.role.findFirst({
                where: {
                    name: data.name,
                    id: { not: id },
                },
            });
            if (existingRole) {
                throw new common_1.ConflictException(`Role with name ${data.name} already exists`);
            }
        }
        return this.prisma.$transaction(async (tx) => {
            const role = await tx.role.update({
                where: { id },
                data: {
                    name: data.name,
                    description: data.description,
                },
            });
            if (data.permissions) {
                await tx.role_permission.deleteMany({
                    where: { role_id: id },
                });
                await this.assignPermissions(tx, id, data.permissions);
            }
            return role;
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.role.delete({
            where: { id },
        });
    }
    async grantPermission(role_id, { resource, action }) {
        await this.findOne(role_id);
        const [resourceRecord, actionRecord] = await Promise.all([
            this.prisma.resource.findUnique({ where: { name: resource } }),
            this.prisma.action.findUnique({ where: { name: action } }),
        ]);
        if (!resourceRecord || !actionRecord) {
            throw new common_1.NotFoundException('Resource or action not found');
        }
        return this.prisma.role_permission.upsert({
            where: {
                role_id_resource_id_action_id: {
                    role_id,
                    resource_id: resourceRecord.id,
                    action_id: actionRecord.id,
                },
            },
            update: {
                granted: true,
            },
            create: {
                role_id,
                resource_id: resourceRecord.id,
                action_id: actionRecord.id,
                granted: true,
            },
        });
    }
    async revokePermission(role_id, { resource, action }) {
        await this.findOne(role_id);
        const [resourceRecord, actionRecord] = await Promise.all([
            this.prisma.resource.findUnique({ where: { name: resource } }),
            this.prisma.action.findUnique({ where: { name: action } }),
        ]);
        if (!resourceRecord || !actionRecord) {
            throw new common_1.NotFoundException('Resource or action not found');
        }
        return this.prisma.role_permission.update({
            where: {
                role_id_resource_id_action_id: {
                    role_id,
                    resource_id: resourceRecord.id,
                    action_id: actionRecord.id,
                },
            },
            data: {
                granted: false,
            },
        });
    }
    async checkPermission(role_id, { resource, action }) {
        const permission = await this.prisma.role_permission.findFirst({
            where: {
                role_id,
                resource: {
                    name: resource,
                },
                action: {
                    name: action,
                },
                granted: true,
            },
        });
        return !!permission;
    }
    async assignPermissions(tx, role_id, permissions) {
        for (const perm of permissions) {
            const resource = await tx.resource.findUnique({
                where: { name: perm.resource },
            });
            if (!resource) {
                throw new common_1.NotFoundException(`Resource ${perm.resource} not found`);
            }
            const actions = await tx.action.findMany({
                where: { name: { in: perm.actions } },
            });
            if (actions.length !== perm.actions.length) {
                throw new common_1.NotFoundException('Some actions not found');
            }
            await tx.rolePermission.createMany({
                data: actions.map((action) => ({
                    role_id,
                    resource_id: resource.id,
                    action_id: action.id,
                    granted: true,
                })),
            });
        }
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoleService);
//# sourceMappingURL=role.service.js.map