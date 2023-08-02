import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { LoginUser } from './login.user.dto';

@InputType()
export class RegisterUser extends LoginUser {
  @MinLength(8)
  @MaxLength(32)
  @IsNotEmpty()
  @Field()
  name: string;
  @MinLength(8)
  @MaxLength(32)
  @IsNotEmpty()
  @Field()
  password_confirmation: string;
  @IsNotEmpty()
  @IsBoolean()
  @Field()
  seller: boolean;
}
