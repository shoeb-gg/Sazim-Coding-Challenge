import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/core/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { PRODUCT } from 'src/models/Products.DTO';
import { User } from 'src/core/auth/user.decorator';
import { USER } from 'src/models/User.DTO';

@Resolver()
export class ProductResolver {
  constructor(private readonly product: ProductService) {}

  @UseGuards(AuthGuard)
  @Mutation()
  async createProduct(
    @Args('productData') productData: PRODUCT,
    @User() user: USER,
  ) {
    return await this.product.createProduct(productData, user.id);
  }

  @UseGuards(AuthGuard)
  @Query()
  async getProductForUser(@User() user: USER): Promise<PRODUCT[]> {
    return await this.product.getProductsById(user.id);
  }
}
