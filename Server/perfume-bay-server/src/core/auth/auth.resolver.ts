import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { USER } from 'src/models/User.DTO';

@Resolver('Auth')
export class AuthResolver {
  constructor(private auth: AuthService) {}

  @Query()
  async getUser(@Args('id') id: string): Promise<USER> {
    return await this.auth.getUser(id);
  }

  @Mutation()
  async createUser(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('phone', { nullable: true }) phone?: string,
    @Args('address', { nullable: true }) address?: string,
  ) {
    return await this.auth.createUser(
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
    );
  }
}
