import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { RegisterInput } from './dto/register.input';
import { AuthPayload } from './dto/auth-payload.model';
import { LoginInput } from './dto/login.input';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: RegisterInput): Promise<AuthPayload> {
    const existingUser = await this.usersService.findByEmail(input.email);

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const createUserData = {
      email: input.email,
      password: hashedPassword,
      ...(input.name !== undefined ? { name: input.name } : {}),
    };

    const user = await this.usersService.createUser(createUserData);

    return this.buildAuthResponse(user.id, user.email, user);
  }

  async login(input: LoginInput): Promise<AuthPayload> {
    const user = await this.usersService.findByEmail(input.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildAuthResponse(user.id, user.email, user);
  }

  async getCurrentUser(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private async buildAuthResponse(
    userId: string,
    email: string,
    user: {
      id: string;
      email: string;
      name: string | null;
      createdAt: Date;
      updatedAt: Date;
    },
  ): Promise<AuthPayload> {
    const payload: JwtPayload = {
      sub: userId,
      email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user,
    };
  }
}
