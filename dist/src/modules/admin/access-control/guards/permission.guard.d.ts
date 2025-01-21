import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessControlService } from '../access-control.service';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
export declare class PermissionGuard implements CanActivate {
    private reflector;
    private accessControl;
    private prisma;
    private readonly logger;
    private readonly errorMessage;
    constructor(reflector: Reflector, accessControl: AccessControlService, prisma: PrismaService, logger: LoggerService);
    private logAndThrowError;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
