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
          const durationInMs = Math.round(endHrTime[0] * 1000 + endHrTime[1] / 1000000);
          
          if (response?.message) {
            this.logger.http(response?.message || 'http', {
              requestId,
              method: request.method,
              url: request.url,
              requestBody: request.body,
              requestHeaders: request.headers,
              responseBody: response,
              statusCode: context.switchToHttp().getResponse().statusCode,
              duration: `${durationInMs}ms`,
              status: 'success',
              actor,
              actorId: sub,
            });
          }
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
      }),
    );
  }
}