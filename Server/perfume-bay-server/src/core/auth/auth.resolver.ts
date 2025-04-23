import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { USER, USER_Signup } from 'src/models/User.DTO';
import { LOGIN, TOKEN } from 'src/models/Login.DTO';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Query()
  async login(@Args('credentials') credentials: LOGIN): Promise<TOKEN> {
    return await this.auth.login(credentials);
  }

  @UseGuards(AuthGuard)
  @Query()
  async getUser(@Args('id') id: string): Promise<USER> {
    return await this.auth.getUser(id);
  }

  @Mutation()
  async createUser(
    @Args('userInfo') userInfo: USER_Signup,
  ): Promise<USER_Signup> {
    return await this.auth.createUser(userInfo);
  }
}
