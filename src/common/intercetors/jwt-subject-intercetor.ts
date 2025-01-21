import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtSubjectInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Handle both JSON and form-data
    if (request.readable) {
      request.on('data', () => {
        if (request.body && user?.userId) {
          request.headers['x-sub'] = user.userId;
        }
      });
    } else if (user?.userId) {
      request.headers['x-sub'] = user.userId;
    }
    
    return next.handle();
  }
}