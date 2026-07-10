import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { RolesDecorator } from './roles.decorator';
import { UserRole } from '../../generated/prisma/client';

export function Authorization(...roles: UserRole[]) {
  if (roles.length > 0) {
    return applyDecorators(
      RolesDecorator(...roles),
      UseGuards(JwtGuard, RolesGuard),
    );
  }

  return applyDecorators(UseGuards(JwtGuard));
}
