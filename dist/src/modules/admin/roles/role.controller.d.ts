import { RoleService } from './role.service';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(data: {
        name: string;
        description?: string;
    }): Promise<{
        id: number;
        name: string;
        description: string | null;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    updatePermissions(id: string, data: {
        resource: string;
        action: string;
        granted: boolean;
    }): Promise<{
        success: boolean;
    }>;
}
