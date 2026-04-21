import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  async getUser(
    @Args('id', { type: () => String }) id: string,
  ): Promise<User | null> {
    return this.usersService.findById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.usersService.create({
      email: input.email,
      name: input.name ?? null,
    });
  }
}
