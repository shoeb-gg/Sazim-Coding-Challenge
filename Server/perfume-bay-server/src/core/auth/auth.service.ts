import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { USER, USER_Signup } from 'src/models/User.DTO';
import { PrismaService } from 'src/prisma.service';
import { UserService } from '../user/user.service';
import { LOGIN, TOKEN } from 'src/models/Login.DTO';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: LOGIN): Promise<TOKEN> {
    const user: USER | undefined = await this.user.getUser(credentials.email);

    if (user?.password !== credentials.password) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user?.id,
      lastName: user?.lastName,
      firstName: user?.firstName,
      email: user?.email,
    };

    return {
      success: true,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUser(id: string): Promise<USER> {
    try {
      const user = await this.prisma.uSER.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user as USER;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while finding business data!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(userInfo: USER_Signup): Promise<USER_Signup> {
    try {
      const newUser = await this.prisma.uSER.create({
        data: { ...userInfo },
      });

      return newUser as USER_Signup;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while creating user!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
