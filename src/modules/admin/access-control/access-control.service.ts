import { Injectable } from '@nestjs/common';
import { IAccessControl } from './types/access-control.type';
import { PrismaService } from 'src/provider/prisma/prisma.service';

@Injectable()
export class AccessControlService implements IAccessControl {
  constructor(private prisma: PrismaService) {}

  async can(role_id: number, resource: string, action: string): Promise<boolean> {
    console.log('role_id',role_id);
    console.log('resource',resource);
    console.log('action',action);
    
    const permission = await this.prisma.role_permission.findFirst({
      where: {
        role_id,
        resource: {
          name: resource,
        },
        action: {
          name: action,
        },
      },
    });

    return permission?.granted ?? false;
  }

  async grantPermission(role_id: number, resource: string, action: string): Promise<void> {
    await this.updatePermission(role_id, resource, action, true);
  }

  async revokePermission(role_id: number, resource: string, action: string): Promise<void> {
    await this.updatePermission(role_id, resource, action, false);
  }

  private async updatePermission(
    role_id: number, 
    resource: string, 
    action: string, 
    granted: boolean
  ): Promise<void> {
    const resourceRecord = await this.prisma.resource.findUnique({
      where: { name: resource },
    });

    const actionRecord = await this.prisma.action.findUnique({
      where: { name: action },
    });

    if (!resourceRecord || !actionRecord) {
      throw new Error('Invalid resource or action');
    }

    await this.prisma.role_permission.upsert({
      where: {
        role_id_resource_id_action_id: {
          role_id,
          resource_id: resourceRecord.id,
          action_id: actionRecord.id,
        },
      },
      update: {
        granted,
      },
      create: {
        role_id,
        resource_id: resourceRecord.id,
        action_id: actionRecord.id,
        granted,
      },
    });
  }
}