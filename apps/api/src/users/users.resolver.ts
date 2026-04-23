import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user', nullable: true })
  async getUser(
    @Args('id', { type: () => String }) id: string,
  ): Promise<User | null> {
    return this.usersService.findById(id);
  }
}
