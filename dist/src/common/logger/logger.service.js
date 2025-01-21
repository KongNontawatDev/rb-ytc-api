"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
const winston = __importStar(require("winston"));
require("winston-daily-rotate-file");
const fs = __importStar(require("fs"));
const node_1 = require("@logtail/node");
const winston_2 = require("@logtail/winston");
const config_1 = require("@nestjs/config");
let LoggerService = class LoggerService {
    constructor(configService) {
        this.configService = configService;
        this.baseLogDir = 'logs';
        this.logDirectories = {
            info: `${this.baseLogDir}/info`,
            error: `${this.baseLogDir}/error`,
            http: `${this.baseLogDir}/http`,
            warn: `${this.baseLogDir}/warn`,
            debug: `${this.baseLogDir}/debug`,
            verbose: `${this.baseLogDir}/verbose`,
        };
        this.createLogDirectories();
        const logtailKey = this.configService.get('logtail_key');
        this.logtail = new node_1.Logtail(logtailKey);
        this.logger = (0, winston_1.createLogger)({
            level: 'debug',
            format: winston_1.format.combine(winston_1.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), winston_1.format.json(), winston_1.format.printf(({ timestamp, level, message, meta }) => {
                const metadata = meta;
                return `[${timestamp}] ${level.toUpperCase()}: ${message} ${metadata ? JSON.stringify(metadata) : ''}`;
            })),
            transports: [
                new winston.transports.DailyRotateFile({
                    dirname: this.logDirectories.http,
                    filename: 'http-%DATE%.log',
                    datePattern: 'DD-MM-YYYY',
                    maxFiles: '30d',
                    level: 'http',
                    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.metadata(), (0, winston_1.format)((info) => (info.level === 'http' ? info : false))()),
                }),
                new winston.transports.DailyRotateFile({
                    dirname: this.logDirectories.error,
                    filename: 'error-%DATE%.log',
                    datePattern: 'DD-MM-YYYY',
                    maxFiles: '30d',
                    level: 'error',
                    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.metadata(), (0, winston_1.format)((info) => (info.level === 'error' ? info : false))()),
                }),
                new winston.transports.DailyRotateFile({
                    dirname: this.logDirectories.info,
                    filename: 'info-%DATE%.log',
                    datePattern: 'DD-MM-YYYY',
                    maxFiles: '30d',
                    level: 'info',
                    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.metadata(), (0, winston_1.format)((info) => (info.level === 'info' ? info : false))()),
                }),
                new winston.transports.DailyRotateFile({
                    dirname: this.logDirectories.warn,
                    filename: 'warn-%DATE%.log',
                    datePattern: 'DD-MM-YYYY',
                    maxFiles: '30d',
                    level: 'warn',
                    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.metadata(), (0, winston_1.format)((info) => (info.level === 'warn' ? info : false))()),
                }),
                new winston.transports.DailyRotateFile({
                    dirname: this.logDirectories.debug,
                    filename: 'debug-%DATE%.log',
                    datePattern: 'DD-MM-YYYY',
                    maxFiles: '30d',
                    level: 'debug',
                    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.metadata(), (0, winston_1.format)((info) => (info.level === 'debug' ? info : false))()),
                }),
                new winston.transports.DailyRotateFile({
                    dirname: this.logDirectories.verbose,
                    filename: 'verbose-%DATE%.log',
                    datePattern: 'DD-MM-YYYY',
                    maxFiles: '30d',
                    level: 'verbose',
                    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.metadata(), (0, winston_1.format)((info) => (info.level === 'verbose' ? info : false))()),
                }),
                new winston_2.LogtailTransport(this.logtail, {
                    level: 'debug',
                    format: winston_1.format.combine(winston_1.format.metadata(), winston_1.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' })),
                }),
                new winston.transports.Console({
                    format: winston_1.format.combine(winston_1.format.colorize({ all: true }), winston_1.format.metadata(), winston_1.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), winston_1.format.printf(({ timestamp, level, message, metadata }) => {
                        const meta = metadata;
                        if (meta?.method && meta?.url && meta?.statusCode) {
                            return `[${timestamp}] ${level.padEnd(7)} [${meta.method}] ${meta.url} : ${message} - ${meta.statusCode}`;
                        }
                        else if (meta) {
                            return `[${timestamp}] ${level.padEnd(7)} : ${message} - ${JSON.stringify(meta)}`;
                        }
                        else {
                            return `[${timestamp}] ${level.padEnd(7)} : ${message}`;
                        }
                    }))
                }),
            ],
        });
    }
    createLogDirectories() {
        Object.values(this.logDirectories).forEach((dir) => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }
    http(message, metadata) {
        this.logger.http(message, metadata);
    }
    log(message, metadata) {
        this.logger.info(message, metadata);
    }
    info(message, metadata) {
        this.logger.info(message, metadata);
    }
    error(message, metadata) {
        this.logger.error(message, metadata);
    }
    warn(message, metadata) {
        this.logger.warn(message, metadata);
    }
    debug(message, metadata) {
        this.logger.debug(message, metadata);
    }
    verbose(message, metadata) {
        this.logger.verbose(message, metadata);
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LoggerService);
//# sourceMappingURL=logger.service.js.map