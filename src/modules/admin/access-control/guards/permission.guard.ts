import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessControlService } from '../access-control.service';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  private readonly errorMessage = 'คุณไม่ได้รับอนุญาติให้กระทำสิ่งนี้';

  constructor(
    private reflector: Reflector,
    private accessControl: AccessControlService,
    private prisma: PrismaService,
    private readonly logger: LoggerService,
  ) {}

  private logAndThrowError(request: any, startTime: number, requestId: string): never {
    const duration = Date.now() - startTime;
    
    this.logger.error(this.errorMessage, {
      requestId,
      method: request.method,
      url: request.url,
      requestBody: request.body,
      requestHeaders: request.headers,
      errorMessage: this.errorMessage,
      errorStack: this.errorMessage,
      statusCode: HttpStatus.FORBIDDEN,
      duration: `${duration}ms`,
      status: 'error',
    });

    throw new ForbiddenException(this.errorMessage);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requestId = uuidv4();
    const startTime = Date.now();

    const resource = this.reflector.get<string>('resource', context.getHandler());
    const action = this.reflector.get<string>('action', context.getHandler());

    if (!resource || !action) {
      return true;
    }

    const admin = request.admin;
    if (!admin?.userId) {
      this.logAndThrowError(request, startTime, requestId);
    }

    const userWithRole = await this.prisma.admin.findUnique({
      where: { id: admin.userId },
      select: { role_id: true },
    });

    if (!userWithRole?.role_id) {
      this.logAndThrowError(request, startTime, requestId);
    }

    const hasPermission = await this.accessControl.can(
      userWithRole.role_id,
      resource,
      action,
    );
    
    if (!hasPermission) {
      this.logAndThrowError(request, startTime, requestId);
    }

    return true;
  }
}