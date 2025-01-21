import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { PermissionGuard } from './guards/permission.guard';

@Controller({
  path:'admin/access-control',
  version:'1'
})
@UseGuards(PermissionGuard)
export class AccessControlController {
  constructor(private accessControl: AccessControlService) {}

  @Post('grant')
  async grantPermission(
    @Body() body: { role_id: number; resource: string; action: string },
  ) {
    await this.accessControl.grantPermission(
      body.role_id,
      body.resource,
      body.action,
    );
    return { message: 'Permission granted successfully' };
  }

  @Post('revoke')
  async revokePermission(
    @Body() body: { role_id: number; resource: string; action: string },
  ) {
    await this.accessControl.revokePermission(
      body.role_id,
      body.resource,
      body.action,
    );
    return { message: 'Permission revoked successfully' };
  }

  @Get('check/:role_id/:resource/:action')
  async checkPermission(
    @Param('role_id') role_id: string,
    @Param('resource') resource: string,
    @Param('action') action: string,
  ) {
    const hasPermission = await this.accessControl.can(
      Number(role_id),
      resource,
      action,
    );
    return { hasPermission };
  }
}