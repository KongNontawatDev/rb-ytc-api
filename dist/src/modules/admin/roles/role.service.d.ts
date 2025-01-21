import { role, role_permission } from '@prisma/client';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { CreateRoleDto, RolePermissionDto, UpdateRoleDto } from './dto/role.dto';
export declare class RoleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateRoleDto): Promise<role>;
    findAll(): Promise<({
        permissions: ({
            resource: {
                id: number;
                name: string;
                description: string | null;
                is_active: boolean;
                created_at: Date;
                updated_at: Date;
            };
            action: {
                id: number;
                name: string;
                description: string | null;
                is_active: boolean;
                created_at: Date;
                updated_at: Date;
            };
        } & {
            id: number;
            created_at: Date;
            updated_at: Date;
            role_id: number;
            resource_id: number;
            action_id: number;
            granted: boolean;
        })[];
    } & {
        id: number;
        name: string;
        description: string | null;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
    })[]>;
    findByCondition(search: string, page?: number, pageSize?: number, sortField?: string, sortOrder?: 'asc' | 'desc'): Promise<{
        data: ({
            permissions: ({
                resource: {
                    id: number;
                    name: string;
                    description: string | null;
                    is_active: boolean;
                    created_at: Date;
                    updated_at: Date;
                };
                action: {
                    id: number;
                    name: string;
                    description: string | null;
                    is_active: boolean;
                    created_at: Date;
                    updated_at: Date;
                };
            } & {
                id: number;
                created_at: Date;
                updated_at: Date;
                role_id: number;
                resource_id: number;
                action_id: number;
                granted: boolean;
            })[];
        } & {
            id: number;
            name: string;
            description: string | null;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
        })[];
        pageCount: number;
        total: number;
    }>;
    findOne(id: number): Promise<role>;
    update(id: number, data: UpdateRoleDto): Promise<role>;
    remove(id: number): Promise<role>;
    grantPermission(role_id: number, { resource, action }: RolePermissionDto): Promise<role_permission>;
    revokePermission(role_id: number, { resource, action }: RolePermissionDto): Promise<role_permission>;
    checkPermission(role_id: number, { resource, action }: RolePermissionDto): Promise<boolean>;
    private assignPermissions;
}
