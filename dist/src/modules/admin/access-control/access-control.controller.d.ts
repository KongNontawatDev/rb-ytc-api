import { AccessControlService } from './access-control.service';
export declare class AccessControlController {
    private accessControl;
    constructor(accessControl: AccessControlService);
    grantPermission(body: {
        role_id: number;
        resource: string;
        action: string;
    }): Promise<{
        message: string;
    }>;
    revokePermission(body: {
        role_id: number;
        resource: string;
        action: string;
    }): Promise<{
        message: string;
    }>;
    checkPermission(role_id: string, resource: string, action: string): Promise<{
        hasPermission: boolean;
    }>;
}
