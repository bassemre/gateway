import { Field, ObjectType } from '@nestjs/graphql';
import { UserDTO } from 'src/users/dtos/user.dto';

@ObjectType()
export class PaymentCardDTO {
  @Field()
  id: string;
  @Field()
  user: UserDTO;
  @Field()
  last_four: string;
  @Field()
  brand: string;
  @Field()
  default: boolean;
  @Field()
  provider_id: string;
  @Field()
  created_at: Date;
}
