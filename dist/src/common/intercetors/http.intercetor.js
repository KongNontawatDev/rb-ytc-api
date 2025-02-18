"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const uuid_1 = require("uuid");
const logger_service_1 = require("../logger/logger.service");
let HttpInterceptor = class HttpInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const requestId = (0, uuid_1.v4)();
        const startHrTime = process.hrtime();
        let sub = null;
        let actor = null;
        const token = request.headers.authorization?.split(' ')[1];
        if (token && token.includes('.')) {
            try {
                const payloadBase64 = token.split('.')[1];
                const decoded = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
                sub = decoded?.sub || null;
                actor = decoded?.actor || null;
            }
            catch (error) {
                console.error('Failed to decode token:', error.message);
            }
        }
        return next.handle().pipe((0, operators_1.tap)({
            next: (response) => {
                const endHrTime = process.hrtime(startHrTime);
                const durationInMs = Math.round(endHrTime[0] * 1000 + endHrTime[1] / 1000000);
                const responseBody = {};
                if (response?.data) {
                    if (Array.isArray(response.data)) {
                        responseBody.data = response.data.map((item) => item.id);
                    }
                    else if (typeof response.data === 'object' && response.data.id) {
                        responseBody.data = { id: response.data.id };
                    }
                }
                if (response?.error !== undefined)
                    responseBody.error = response.error;
                if (response?.message)
                    responseBody.message = response.message;
                if (response?.meta)
                    responseBody.meta = response.meta;
                this.logger.http(response?.message || 'http', {
                    requestId,
                    method: request.method,
                    url: request.url,
                    requestBody: request.body,
                    requestHeaders: request.headers,
                    responseBody,
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    duration: `${durationInMs}ms`,
                    status: 'success',
                    tableName: request?.body?.context,
                    actor,
                    actorId: sub,
                });
            },
            error: (error) => {
                const endHrTime = process.hrtime(startHrTime);
                const durationInMs = Math.round(endHrTime[0] * 1000 + endHrTime[1] / 1000000);
                this.logger.error(error.response?.message || error.message, {
                    requestId,
                    method: request.method,
                    url: request.url,
                    requestBody: request.body,
                    requestHeaders: request.headers,
                    errorMessage: error.message,
                    errorStack: error.stack,
                    statusCode: error.status,
                    duration: `${durationInMs}ms`,
                    status: 'error',
                    actor,
                    actorId: sub,
                });
            },
        }));
    }
};
exports.HttpInterceptor = HttpInterceptor;
exports.HttpInterceptor = HttpInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], HttpInterceptor);
//# sourceMappingURL=http.intercetor.js.map