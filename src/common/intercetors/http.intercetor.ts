import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const requestId = uuidv4();
    const startHrTime = process.hrtime();

    let sub = null;
    let actor = null;
    const token = request.headers.authorization?.split(' ')[1];

    if (token && token.includes('.')) {
      try {
        const payloadBase64 = token.split('.')[1];
        const decoded = JSON.parse(
          Buffer.from(payloadBase64, 'base64').toString(),
        );
        sub = decoded?.sub || null;
        actor = decoded?.actor || null;
      } catch (error) {
        console.error('Failed to decode token:', error.message);
      }
    }

    return next.handle().pipe(
      tap({
        next: (response) => {
          const endHrTime = process.hrtime(startHrTime);
          const durationInMs = Math.round(
            endHrTime[0] * 1000 + endHrTime[1] / 1000000,
          );

          // กรองข้อมูล responseBody
          const responseBody: any = {};
          if (response?.data) {
            if (Array.isArray(response.data)) {
              responseBody.data = response.data.map((item) => item.id);
            } else if (typeof response.data === 'object' && response.data.id) {
              responseBody.data = { id: response.data.id };
            }
          }
          if (response?.error !== undefined)
            responseBody.error = response.error;
          if (response?.message) responseBody.message = response.message;
          if (response?.meta) responseBody.meta = response.meta;

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
          const durationInMs = Math.round(
            endHrTime[0] * 1000 + endHrTime[1] / 1000000,
          );

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
      }),
    );
  }
}
