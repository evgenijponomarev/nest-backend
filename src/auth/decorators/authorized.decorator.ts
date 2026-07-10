import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../generated/prisma/client';
import { Request } from 'express';

export const Authorized = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const request = ctx.getContext<{ req: Request }>().req;

    const user = request.user as User;

    return data ? user[data] : user;
  },
);
