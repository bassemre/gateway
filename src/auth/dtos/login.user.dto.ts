import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
@InputType()
export class LoginUser {
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Field()
  password: string;
}
