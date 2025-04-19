import { Injectable } from '@nestjs/common';

import { USER } from 'src/models/User.DTO';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(email: string): Promise<USER | undefined> {
    try {
      const user = await this.prisma.uSER.findUnique({
        where: {
          //   id: id,
          email: email,
        },
      });

      return user as USER;
    } catch (error) {
      console.log(error);
    }
  }
}
