export interface CreateRoleDto {
  name: string;
  description?: string;
  permissions?: Array<{
    resource: string;
    actions: string[];
  }>;
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
  permissions?: Array<{
    resource: string;
    actions: string[];
  }>;
}

export interface RolePermissionDto {
  resource: string;
  action: string;
}