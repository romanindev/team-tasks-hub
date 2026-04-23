import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { AuthUser } from '../interfaces/auth-user.interface';
import type { GraphqlContext } from '../interfaces/graphql-context.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthUser | undefined => {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext<GraphqlContext>();

    return req.user;
  },
);
