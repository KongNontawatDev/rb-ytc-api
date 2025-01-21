import { Injectable, LoggerService as LoggerServiceCommon } from '@nestjs/common';
import { createLogger, format, Logger } from 'winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as fs from 'fs';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerService implements LoggerServiceCommon {
  private logger: Logger;
  private readonly baseLogDir = 'logs';
  private readonly logDirectories = {
    info: `${this.baseLogDir}/info`,
    error: `${this.baseLogDir}/error`,
    http: `${this.baseLogDir}/http`,
    warn: `${this.baseLogDir}/warn`,
    debug: `${this.baseLogDir}/debug`,
    verbose: `${this.baseLogDir}/verbose`,
  };
  private logtail: Logtail;

  constructor(private configService: ConfigService) {
    this.createLogDirectories();
    const logtailKey = this.configService.get<string>('logtail_key');
    
    this.logtail = new Logtail(logtailKey!);

    this.logger = createLogger({
      level: 'debug',
      format: format.combine(
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        format.json(),
        format.printf(({ timestamp, level, message, meta }) => {
          const metadata = meta as Record<string, any>;
          return `[${timestamp}] ${level.toUpperCase()}: ${message} ${
            metadata ? JSON.stringify(metadata) : ''
          }`;
        }),
      ),
      transports: [
        // Transport สำหรับ HTTP logs
        new winston.transports.DailyRotateFile({
          dirname: this.logDirectories.http,
          filename: 'http-%DATE%.log',
          datePattern: 'DD-MM-YYYY',
          maxFiles: '30d',
          level: 'http',
          format: format.combine(
            format.timestamp(),
            format.json(),
            format.metadata(),
            format((info) => (info.level === 'http' ? info : false))()
          ),
        }),
        // Transport สำหรับ error logs
        new winston.transports.DailyRotateFile({
          dirname: this.logDirectories.error,
          filename: 'error-%DATE%.log',
          datePattern: 'DD-MM-YYYY',
          maxFiles: '30d',
          level: 'error',
          format: format.combine(
            format.timestamp(),
            format.json(),
            format.metadata(),
            format((info) => (info.level === 'error' ? info : false))()
          ),
        }),
        // Transport สำหรับ info logs
        new winston.transports.DailyRotateFile({
          dirname: this.logDirectories.info,
          filename: 'info-%DATE%.log',
          datePattern: 'DD-MM-YYYY',
          maxFiles: '30d',
          level: 'info',
          format: format.combine(
            format.timestamp(),
            format.json(),
            format.metadata(),
            format((info) => (info.level === 'info' ? info : false))()
          ),
        }),
        // Transport สำหรับ warn logs
        new winston.transports.DailyRotateFile({
          dirname: this.logDirectories.warn,
          filename: 'warn-%DATE%.log',
          datePattern: 'DD-MM-YYYY',
          maxFiles: '30d',
          level: 'warn',
          format: format.combine(
            format.timestamp(),
            format.json(),
            format.metadata(),
            format((info) => (info.level === 'warn' ? info : false))()
          ),
        }),
        // Transport สำหรับ debug logs
        new winston.transports.DailyRotateFile({
          dirname: this.logDirectories.debug,
          filename: 'debug-%DATE%.log',
          datePattern: 'DD-MM-YYYY',
          maxFiles: '30d',
          level: 'debug',
          format: format.combine(
            format.timestamp(),
            format.json(),
            format.metadata(),
            format((info) => (info.level === 'debug' ? info : false))()
          ),
        }),
        // Transport สำหรับ verbose logs
        new winston.transports.DailyRotateFile({
          dirname: this.logDirectories.verbose,
          filename: 'verbose-%DATE%.log',
          datePattern: 'DD-MM-YYYY',
          maxFiles: '30d',
          level: 'verbose',
          format: format.combine(
            format.timestamp(),
            format.json(),
            format.metadata(),
            format((info) => (info.level === 'verbose' ? info : false))()
          ),
        }),

        new LogtailTransport(this.logtail, {
          level: 'debug',
          format: format.combine(
            format.metadata(),
            format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
            
          ),
        }),

        // ปรับปรุง Console Transport
        new winston.transports.Console({
          format: format.combine(
            format.colorize({ all: true }),
            format.metadata(),
            format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
            format.printf(({ timestamp, level, message, metadata }) => {
              
              const meta = metadata as Record<string, any>;
              if (meta?.method && meta?.url && meta?.statusCode) {
                // Format สำหรับ HTTP request
                return `[${timestamp}] ${level.padEnd(7)} [${meta.method}] ${meta.url} : ${message} - ${meta.statusCode}`;
              } else if (meta) {
                // Format สำหรับ log ทั่วไปที่มี meta
                return `[${timestamp}] ${level.padEnd(7)} : ${message} - ${JSON.stringify(meta)}`;
              } else {
                // Format สำหรับ log ทั่วไป
                return `[${timestamp}] ${level.padEnd(7)} : ${message}`;
              }
            })
          )
        }),
      ],
    });
  }

  private createLogDirectories(): void {
    Object.values(this.logDirectories).forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  http(message: string, metadata?: Record<string, any>) {
    this.logger.http(message, metadata);
  }

  log(message: string, metadata?: Record<string, any>) {
    this.logger.info(message, metadata);
  }

  info(message: string, metadata?: Record<string, any>) {
    this.logger.info(message, metadata);
  }

  error(message: string, metadata?: Record<string, any>) {
    this.logger.error(message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>) {
    this.logger.warn(message, metadata);
  }

  debug(message: string, metadata?: Record<string, any>) {
    this.logger.debug(message, metadata);
  }

  verbose(message: string, metadata?: Record<string, any>) {
    this.logger.verbose(message, metadata);
  }
}