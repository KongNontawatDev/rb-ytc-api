"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function setupAccessControl() {
    const prisma = new client_1.PrismaClient();
    try {
        const actions = ['create', 'read', 'update', 'delete'];
        await prisma.action.createMany({
            data: actions.map(name => ({
                name,
                description: `Permission to ${name}`,
            })),
            skipDuplicates: true,
        });
        const resources = ['users', 'roles', 'permissions'];
        await prisma.resource.createMany({
            data: resources.map(name => ({
                name,
                description: `${name.charAt(0).toUpperCase() + name.slice(1)} resource`,
            })),
            skipDuplicates: true,
        });
        const roles = [
            {
                name: 'user',
                description: 'Regular user with basic access',
                permissions: [
                    { resource: 'users', actions: ['read'] },
                ],
            },
            {
                name: 'admin',
                description: 'Administrator with elevated access',
                permissions: [
                    { resource: 'users', actions: ['create', 'read', 'update'] },
                    { resource: 'roles', actions: ['read'] },
                ],
            },
            {
                name: 'super_admin',
                description: 'Super administrator with full access',
                permissions: resources.map(resource => ({
                    resource,
                    actions,
                })),
            },
        ];
        for (const roleData of roles) {
            const role = await prisma.role.create({
                data: {
                    name: roleData.name,
                    description: roleData.description,
                },
            });
            for (const perm of roleData.permissions) {
                const resource = await prisma.resource.findUnique({
                    where: { name: perm.resource },
                });
                if (!resource) {
                    console.warn(`Resource not found: ${perm.resource}`);
                    continue;
                }
                const actionRecords = await prisma.action.findMany({
                    where: { name: { in: perm.actions } },
                });
                if (actionRecords.length === 0) {
                    console.warn(`Actions not found: ${perm.actions.join(', ')}`);
                    continue;
                }
                await prisma.role_permission.createMany({
                    data: actionRecords.map(action => ({
                        role_id: role.id,
                        resource_id: resource.id,
                        action_id: action.id,
                        granted: true,
                    })),
                });
            }
        }
        console.log('Access control setup completed successfully');
    }
    catch (error) {
        console.error('Error setting up access control:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
setupAccessControl();
//# sourceMappingURL=seeds.js.map