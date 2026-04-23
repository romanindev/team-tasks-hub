import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @Field()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string;
}
