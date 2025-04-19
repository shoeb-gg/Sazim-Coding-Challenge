import { AuthService } from './auth.service';

import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthResolver, AuthService, PrismaService],
})
export class AuthModule {}
