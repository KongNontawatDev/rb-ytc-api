import { LoggerService as LoggerServiceCommon } from '@nestjs/common';
import 'winston-daily-rotate-file';
import { ConfigService } from '@nestjs/config';
export declare class LoggerService implements LoggerServiceCommon {
    private configService;
    private logger;
    private readonly baseLogDir;
    private readonly logDirectories;
    private logtail;
    constructor(configService: ConfigService);
    private createLogDirectories;
    http(message: string, metadata?: Record<string, any>): void;
    log(message: string, metadata?: Record<string, any>): void;
    info(message: string, metadata?: Record<string, any>): void;
    error(message: string, metadata?: Record<string, any>): void;
    warn(message: string, metadata?: Record<string, any>): void;
    debug(message: string, metadata?: Record<string, any>): void;
    verbose(message: string, metadata?: Record<string, any>): void;
}
