import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderDTO } from './dto/order.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(@Inject('REDIS') private redis: ClientProxy) {}

  async findOrdersByUser(user_id: string): Promise<any> {
    const observ = this.redis.send('get-orders-by-user', user_id);
    return await lastValueFrom(observ);
  }

  async store(
    orders: any,
    user_id,
    fetchedProducts,
  ): Promise</*ProductEntity*/ any> {
    const mappedProducts = fetchedProducts
      .map((product) => {
        // find the product which user passed, to retrieve the ordered quantity.
        const p = orders.find((p) => p.id === product.id);
        if (p) {
          return { ...product, ordered_quantity: p.quantity };
        }
        return product;
      })
      .filter((product) => !!product.ordered_quantity);
    const observ = this.redis.send('create_order', {
      products: mappedProducts,
      user_id,
    });
    const order = await lastValueFrom(observ);
    this.redis.emit('order_created', orders);
    return order;
  }

  async destroyUserOrder(order_id: any, user_id): Promise<OrderDTO> {
    const observ = this.redis.send('destroy-order-by-id', {
      id: order_id,
      user_id,
    });
    const order = await lastValueFrom(observ);

    // fire an event that order is deleted to increase the product's quantity.
    this.redis.emit('order_deleted', order.products);
    return order;
  }
}
