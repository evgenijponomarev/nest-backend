import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { User, UserRole } from '../../generated/prisma/client';
import { GqlExecutionContext } from '@nestjs/graphql';
import { type Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesContext = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!rolesContext) return true;

    const ctx = GqlExecutionContext.create(context);

    const request = ctx.getContext<{ req: Request }>().req;

    const user = request.user as User;

    if (!rolesContext.includes(user.role))
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );

    return true;
  }
}
