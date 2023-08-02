import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { UserDTO } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('REDIS') private readonly redis: ClientProxy) {}

  async getUsers(): Promise<UserDTO[]> {
    const response = await this.redis.send<UserDTO[]>('users', []);
    return response.toPromise();
  }

  async fetchUsersByIds(ids: string[]): Promise<UserDTO> {
    const user = await this.redis
      .send<UserDTO, string[]>('fetch-users-by-ids', ids)
      .toPromise();
    return user;
  }

  me(id: any) {
    return new Promise((resolve, reject) => {
      this.redis.send<UserDTO>('current-loggedin-user', id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        },
      );
    });
  }
}
