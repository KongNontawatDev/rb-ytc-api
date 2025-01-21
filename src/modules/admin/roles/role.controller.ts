import { Controller, Post, Body, Param } from '@nestjs/common';
import { RequirePermission } from '../access-control/decorators/require-permission.decorator';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @RequirePermission('roles', 'create')
  async create(@Body() data: { name: string; description?: string }) {
    return this.roleService.create(data);
  }

  @Post(':id/permissions')
  @RequirePermission('roles', 'update')
  async updatePermissions(
    @Param('id') id: string,
    @Body() data: { resource: string; action: string; granted: boolean }
  ) {
    const role_id = parseInt(id);
    const { resource, action, granted } = data;

    if (granted) {
      await this.roleService.grantPermission(role_id, {resource, action});
    } else {
      await this.roleService.revokePermission(role_id, {resource, action});
    }

    return { success: true };
  }
}