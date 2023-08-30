import { Module, Scope } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import microservicesConfig from 'src/shared/config/microservices.config';
import { ClientsModule } from '@nestjs/microservices';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ClientsModule.register(microservicesConfig()), UsersModule],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
