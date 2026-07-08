import { NestInterceptor } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data: unknown) => ({
        status: 'OK',
        data,
      })),
    );
  }
}
