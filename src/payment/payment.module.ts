import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { ClientsModule } from '@nestjs/microservices';
import microservicesConfig from 'src/shared/config/microservices.config';

@Module({
  imports: [ClientsModule.register(microservicesConfig())],
  providers: [PaymentService, PaymentResolver],
})
export class PaymentModule {}
