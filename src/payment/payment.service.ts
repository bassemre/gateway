import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentCardDTO } from './dtos/paymentCard.dto';
import { lastValueFrom } from 'rxjs';
import { CreatePaymentCard } from './dtos/createPaymentCard.dto';
import { UserDTO } from 'src/users/dtos/user.dto';

@Injectable()
export class PaymentService {
  constructor(@Inject('REDIS') private redis: ClientProxy) {}
  async getUserPaymentCards(user_id: string): Promise<PaymentCardDTO[]> {
    const observ = this.redis.send<PaymentCardDTO[]>(
      'get-user-payment-cards',
      user_id,
    );

    const paymentCards = await lastValueFrom(observ);
    return paymentCards;
  }

  async showPaymentCard(id, user_id) {
    const observ = this.redis.send('show-user-payment-card', {
      id,
      user_id,
    });

    return await lastValueFrom(observ);
  }

  async createPaymentCard(
    data: CreatePaymentCard,
    user: UserDTO,
  ): Promise<PaymentCardDTO> {
    return this.redis
      .send<PaymentCardDTO, { data: CreatePaymentCard; user: UserDTO }>(
        'create-payment',
        {
          data,
          user,
        },
      )
      .toPromise();
  }

  async createChargeForUser(order, user) {
    return await lastValueFrom(
      this.redis.send('create-charge', {
        total_price: order.total_price,
        user,
      }),
    );
  }

  async deletePaymentCard(id: string, user_id: string) {
    const observ = this.redis.send<PaymentCardDTO>('delete-user-payment', {
      id,
      user_id,
    });

    return await lastValueFrom(observ);
  }
}
