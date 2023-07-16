import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ClientsModule } from '@nestjs/microservices';
import microservicesConfig from '../shared/config/microservices.config';
import { ProductResolver } from './products.resolver';

@Module({
  imports: [ClientsModule.register(microservicesConfig())],
  providers: [ProductsService, ProductResolver],
})
export class ProductsModule {}
