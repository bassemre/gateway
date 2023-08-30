import { HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import {
  Query,
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/shared/decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { OrderService } from './order.service';
import { ProductDTO } from 'src/products/dto/product.dto';
import { OrderDTO } from './dto/order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ProductEntity } from 'src/shared/types/products.types';
import { CreateOrder } from './dto/create.order.dto';
import { lastValueFrom } from 'rxjs';
import { UserDTO } from 'src/users/dtos/user.dto';

@Resolver((of) => OrderDTO)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    @Inject('REDIS') private redis: ClientProxy,
  ) {}

  /* @ResolveProperty('user', () => UserDTO)
  async user(@Parent() order: OrderDTO): Promise<UserDTO> {
    return this.usersDataLoader.load(order.user_id);
  }
  @ResolveProperty('products', () => ProductDTO)
  async products(@Parent() order): Promise<ProductDTO> {
    return this.orderProductLoader.loadMany(order.products);
  }*/
  @Query((returns) => [OrderDTO], { name: 'ordersByUser' })
  @UseGuards(JwtAuthGuard)
  async getOrders(@CurrentUser() user: any): Promise<[OrderDTO]> {
    return await this.orderService.findOrdersByUser(user.id);
  }

  @Mutation((returns) => OrderDTO)
  @UseGuards(JwtAuthGuard)
  async createOrders(
    @CurrentUser() user: any,
    @Args({ name: 'createOrders', type: () => [CreateOrder] })
    orders: [CreateOrder],
  ): Promise<any> {
    // fetch products user is trying to purchase to check on the quantity.
    const observ = this.redis.send<ProductEntity[]>(
      'fetch-products-by-ids',
      orders.map((product) => product.id),
    );

    const fetchedProducts = await lastValueFrom(observ);
    const filteredProducts = orders.filter((product) => {
      const p = fetchedProducts.find((p) => p.id === product.id);
      return p.quantity >= product.quantity;
    });
    // there is something wrong with the quantity of passed products.
    if (filteredProducts.length != orders.length) {
      throw new HttpException(
        'Products are out of stock at the moment, try with lower stock.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    } else {
      return await this.orderService.store(orders, user.id, fetchedProducts);
    }
  }
  @Mutation((returns) => OrderDTO)
  @UseGuards(JwtAuthGuard)
  async deleteOrder(@Args('order') id: string, @CurrentUser() user: any) {
    return this.orderService.destroyUserOrder(id, user.id);
  }
  //like nested query to populate user property in parent class(orderDto) by another property in parent class
  //so user and user_id must be defined in orderDto object type(parent class)
  //so there we make two query to database first one getOrders or create orders (any resolver return orderDto and by fetched user_id we make the second query to populate user
  //so the importance of dataloader here because for each user_id we make anew request to query the DB (so this is inefficient)
  @ResolveField('user', () => UserDTO)
  async user(@Parent() order: OrderDTO): Promise<any> {
    return this.orderService.getUser(order.user_id);
  }
}
