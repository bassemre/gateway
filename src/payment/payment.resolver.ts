import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/shared/decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePaymentCard } from './dtos/createPaymentCard.dto';
import { PaymentCardDTO } from './dtos/paymentCard.dto';
import { OrderDTO } from 'src/order/dto/order.dto';
import { lastValueFrom } from 'rxjs';

@Resolver()
export class PaymentResolver {
  constructor(
    private readonly paymentCardsService: PaymentService,
    @Inject('REDIS') private redis: ClientProxy,
  ) {}
  @Query((returns) => [PaymentCardDTO])
  @UseGuards(JwtAuthGuard)
  async getUserPaymentCards(@CurrentUser('user') user: any) {
    return await this.paymentCardsService.getUserPaymentCards(user.id);
  }
  @Query((returns) => PaymentCardDTO)
  @UseGuards(JwtAuthGuard)
  async showPaymentCard(
    @Args('id') id: string,
    @CurrentUser('user') user: any,
  ) {
    return this.paymentCardsService.showPaymentCard(id, user.id);
  }

  @Mutation((returns) => PaymentCardDTO)
  @UseGuards(JwtAuthGuard)
  async createPaymentCard(
    @Args('data') data: CreatePaymentCard,
    @CurrentUser('user') user: any,
  ) {
    const observ = await this.redis.send('current-loggedin-user', user.id);

    const logginUser = await lastValueFrom(observ);
    return this.paymentCardsService.createPaymentCard(data, logginUser);
  }

  @Mutation((returs) => OrderDTO)
  @UseGuards(JwtAuthGuard)
  async createChargeForUser(
    @Args('orderId') orderId: string,
    @CurrentUser('user') user: any,
  ) {
    const logginUser = await lastValueFrom(
      this.redis.send('current-loggedin-user', user.id),
    );
    const order = await lastValueFrom(
      this.redis.send('show-user-order', {
        id: orderId,
        user_id: user.id,
      }),
    );
    const charge = await this.paymentCardsService.createChargeForUser(
      order,
      logginUser,
    );

    this.redis.emit('order_charged', {
      id: orderId,
      status: charge.status,
    });

    order.status = charge.status;
    order.user = user;
    return order;
  }

  /* @Mutation()
  @UseGuards(JwtAuthGuard)
  async deletePaymentCard(
    @Args('id') id: string,
    @CurrentUser('user') user: any,
  ) {
    return this.paymentCardsService.deletePaymentCard(id, user.id);
  }*/
}
