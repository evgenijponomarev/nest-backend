import { UnauthorizedException, type CanActivate } from '@nestjs/common';
import { type ExecutionContext } from '@nestjs/common';
import { type Request } from 'express';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;

    if (!token?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Вы не авторизованы');
    }

    return true;
  }
}
