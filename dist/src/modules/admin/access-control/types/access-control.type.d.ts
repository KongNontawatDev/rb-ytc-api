export interface IAccessControl {
    can(role_id: number, resource: string, action: string): Promise<boolean>;
}
