import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductEntity {
  @Field()
  id: string;
  @Field()
  price: number;
  @Field()
  user_id: string;
  @Field((type) => Int)
  quantity: number;
  @Field((type) => String, { nullable: true })
  title: string;
  @Field()
  description: string;
  @Field()
  image: string;
  @Field()
  created_at: Date;
  @Field()
  updated_at: Date;
}

@InputType()
export class createProductInput {
  @Field()
  price: number;
  @Field((type) => Int)
  quantity: number;
  @Field((type) => String, { nullable: true })
  title: string;
  @Field()
  description: string;
  @Field()
  image: string;
}
