import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, Min, IsInt, IsUUID } from 'class-validator';

@InputType()
export class CreateOrder {
  //@Min(1)
  //@IsNotEmpty()
  //@IsInt()
  @Field((type) => Int)
  quantity: number;
  //@IsUUID()
  //@IsNotEmpty()
  @Field()
  id: string;
}
