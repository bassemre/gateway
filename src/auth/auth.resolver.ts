import { Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { TokenDTO } from './dtos/token.dto';
import { LoginUser } from './dtos/login.user.dto';
import { RegisterUser } from './dtos/register.user.dto';
import { Mutation, Args } from '@nestjs/graphql';
import { UserDTO } from 'src/users/dtos/user.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation((returns) => TokenDTO)
  async login(@Args('LoginUser') loginUser: LoginUser): Promise<any> {
    return await this.authService.login(loginUser);
  }
  @Mutation((returns) => UserDTO)
  async register(
    @Args('RegisterUser') registerUser: RegisterUser,
  ): Promise<any> {
    return await this.authService.register(registerUser);
  }
}
