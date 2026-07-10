import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../generated/prisma/client';

export const ROLES_KEY = 'roles';

export const RolesDecorator = (...roles: UserRole[]) =>
  SetMetadata(ROLES_KEY, roles);
