import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { USER } from 'src/models/User.DTO';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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
      console.log(error);
      throw new HttpException(
        'Server Error while finding business data!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone?: string,
    address?: string,
  ): Promise<USER> {
    try {
      const newUser = await this.prisma.uSER.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          phone: phone,
          address: address,
        },
      });

      return newUser as USER;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Server Error while creating user!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
