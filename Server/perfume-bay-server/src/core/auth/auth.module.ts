import { AuthService } from './auth.service';

import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma.service';

import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'Hogwarts business, very secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [],
  providers: [AuthResolver, AuthService, PrismaService],
})
export class AuthModule {}
