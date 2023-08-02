import { Field, ObjectType } from '@nestjs/graphql';

import { AddressDTO } from 'src/products/dto/address.dto';

@ObjectType()
export class UserDTO {
  @Field()
  id: string; // ObjectID;
  @Field()
  name: string;
  readonly password: string;
  @Field()
  seller: boolean;
  // @Field()
  // address: AddressDTO;
  @Field()
  created_at: Date;
}
