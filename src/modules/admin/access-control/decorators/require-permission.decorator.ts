import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PermissionGuard } from '../guards/permission.guard';
import { JwtAuthGuard } from '@provider/jwt/guards/jwt-auth.guard';

export function RequirePermission(resource: string, action: string) {
  return applyDecorators(
    SetMetadata('resource', resource),
    SetMetadata('action', action),
    UseGuards(JwtAuthGuard, PermissionGuard),
  );
}