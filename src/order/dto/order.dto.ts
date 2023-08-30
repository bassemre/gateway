import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ProductEntity } from 'src/shared/types/products.types';
import { UserDTO } from 'src/users/dtos/user.dto';
@ObjectType()
export class ProductOrder {
  @Field()
  id: string;
  @Field((type) => Int)
  quantity: number;
}

@ObjectType()
export class OrderDTO {
  @Field()
  user: UserDTO;
  @Field()
  user_id: string;
  @Field((type) => Float)
  total_price: number;
  @Field((type) => [ProductOrder])
  products: ProductOrder[];
  @Field()
  status: string;
  @Field({ nullable: true })
  created_at: Date;
}
