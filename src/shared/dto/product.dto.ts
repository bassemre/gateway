import { Field, ObjectType } from '@nestjs/graphql';
//import { UserDTO } from './user.dto';

@ObjectType()
export class ProductDTO {
  // user: UserDTO;
  @Field()
  id: string;

  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  image: string;
  @Field()
  price: string;
  // created_at: Date;
}
