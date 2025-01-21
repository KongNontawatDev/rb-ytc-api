import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { LoggerService } from 'src/common/logger/logger.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly errorMessage = 'ต้องล็อคอินเข้าสู่ระบบก่อน';
  private context: ExecutionContext;

  constructor(
    private reflector: Reflector,
    private readonly logger: LoggerService,
  ) {
    super();
  }

  private logAuthError(request: any): void {
    const requestId = uuidv4();
    const startTime = Date.now();
    const duration = Date.now() - startTime;
    
    this.logger.error(this.errorMessage, {
      requestId,
      method: request.method,
      url: request.url,
      requestBody: request.body,
      requestHeaders: request.headers,
      errorMessage: this.errorMessage,
      errorStack: this.errorMessage,
      statusCode: HttpStatus.UNAUTHORIZED,
      duration: `${duration}ms`,
      status: 'error',
    });
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.context = context;

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any): any {
    if (err || !user) {
      const request = this.context.switchToHttp().getRequest();
      this.logAuthError(request);
      throw new UnauthorizedException(this.errorMessage);
    }
    return user;
  }
}
