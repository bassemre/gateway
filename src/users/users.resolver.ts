import { Query, Resolver, Context, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
//import { UserDTO } from '@commerce/shared';
import { UserService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from './dtos/user.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorator';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [UserDTO], { name: 'Users' })
  getUsers(): Promise<UserDTO[]> {
    return this.userService.getUsers();
  }

  @Query((returns) => UserDTO)
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: UserDTO) {
    return this.userService.me(user.id);
  }
}
