import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenDTO {
  @Field()
  token: string;
}
