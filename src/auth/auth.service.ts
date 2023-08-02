import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginUser } from './dtos/login.user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterUser } from './dtos/register.user.dto';
import { UserDTO } from 'src/users/dtos/user.dto';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class AuthService {
  constructor(@Inject('REDIS') private readonly redis: ClientProxy) {}

  async login(loginUser: LoginUser): Promise<any> {
    return this.redis.send('login-user', loginUser);
  }

  async register(registerUser: RegisterUser): Promise<any> {
    return this.redis.send<UserDTO>('register-user', registerUser);
  }
  async validateUser(payload): Promise<any> {
    const observable = this.redis.send('validate-user', payload);
    const user = await lastValueFrom(observable); //instead of this.redis.send('validate-user', payload).toPromise()
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
