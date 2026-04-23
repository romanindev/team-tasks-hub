import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '../users/models/user.model';

import { AuthPayload } from './dto/auth-payload.model';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import type { AuthUser } from './interfaces/auth-user.interface';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  register(@Args('input') input: RegisterInput): Promise<AuthPayload> {
    return this.authService.register(input);
  }

  @Mutation(() => AuthPayload)
  login(@Args('input') input: LoginInput): Promise<AuthPayload> {
    return this.authService.login(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'currentUser' })
  currentUser(@CurrentUser() user: AuthUser) {
    return this.authService.getCurrentUser(user.id);
  }
}
