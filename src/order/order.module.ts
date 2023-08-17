import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import microservicesConfig from 'src/shared/config/microservices.config';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register(microservicesConfig())],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
