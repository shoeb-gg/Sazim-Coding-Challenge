import { PrismaService } from 'src/prisma.service';
import { ProductService } from './product.service';

import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [ProductService, PrismaService, ProductResolver],
})
export class ProductModule {}
