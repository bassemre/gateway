import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { UserDTO } from './dtos/user.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('REDIS') private readonly redis: ClientProxy) {}

  async getUsers(): Promise<UserDTO[]> {
    const response = this.redis.send<UserDTO[]>('users', []);
    return await lastValueFrom(response);
  }

  me(id: any) {
    return this.redis.send<UserDTO>('current-loggedin-user', id);
  }
  async fetchUsersByIds(ids: /*[string]*/ any): Promise<[UserDTO]> {
    const user = await this.redis
      .send</*UserDTO, string[]*/ any>('fetch-users-by-ids', ids)
      .toPromise();
    return user;
  }
}
