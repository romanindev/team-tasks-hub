import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import type {
  AuthenticatedRequest,
  GraphqlContext,
} from '../interfaces/graphql-context.interface';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  override getRequest(context: ExecutionContext): AuthenticatedRequest {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext<GraphqlContext>();

    return req;
  }
}
