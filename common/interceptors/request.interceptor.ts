import {
  Injectable,
  NestInterceptor,
  Logger,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  private logger: Logger = new Logger(RequestInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const {
      originalUrl,
      method,
      params,
      query,
      body,
    } = context.switchToHttp().getRequest();

    this.logger.log({
      originalUrl,
      method,
      params,
      query,
      body,
    });

    return next.handle();
  }
}
