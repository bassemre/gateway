import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length, IsNumberString, IsBoolean } from 'class-validator';
@InputType()
export class CreatePaymentCard {
  //@IsNotEmpty()
  @Field()
  provider_id: string;
  //@IsNotEmpty()
  @Field()
  token_id: string;
  //@IsNotEmpty()
  @Field()
  brand: string;
  //@IsNumberString()
  //@IsNotEmpty()
  @Field()
  @Length(4)
  last_four: string;
  //@IsBoolean()
  //@IsNotEmpty()
  default: boolean;
}
