import { IAccessControl } from './types/access-control.type';
import { PrismaService } from 'src/provider/prisma/prisma.service';
export declare class AccessControlService implements IAccessControl {
    private prisma;
    constructor(prisma: PrismaService);
    can(role_id: number, resource: string, action: string): Promise<boolean>;
    grantPermission(role_id: number, resource: string, action: string): Promise<void>;
    revokePermission(role_id: number, resource: string, action: string): Promise<void>;
    private updatePermission;
}
