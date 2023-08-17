import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ProductEntity } from 'src/shared/types/products.types';
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
  user_id: string;
  @Field((type) => Float)
  total_price: number;
  @Field((type) => [ProductOrder])
  products: ProductOrder[];
  @Field({ nullable: true })
  created_at: Date;
}
