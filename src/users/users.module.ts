import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { ClientsModule } from '@nestjs/microservices';
import microservicesConfig from 'src/shared/config/microservices.config';
import { UserService } from './users.service';

@Module({
  imports: [ClientsModule.register(microservicesConfig())],
  providers: [UserService, UserResolver],
})
export class UsersModule {}
