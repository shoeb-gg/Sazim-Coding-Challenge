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
  @Mutation()
  async updateProduct(
    @Args('productData') productData: PRODUCT,
    @User() user: USER,
  ) {
    return await this.product.updateProduct(productData, user.id);
  }

  @UseGuards(AuthGuard)
  @Query()
  async getProductForUser(@User() user: USER): Promise<PRODUCT[]> {
    return await this.product.getProductForUser(user.id);
  }

  @UseGuards(AuthGuard)
  @Query()
  async getProductById(@Args('id') id: string): Promise<PRODUCT> {
    return await this.product.getProductById(id);
  }

  @Query()
  async getAllProducts(): Promise<PRODUCT[]> {
    return await this.product.getAllProducts();
  }

  @UseGuards(AuthGuard)
  @Mutation()
  async deleteProduct(@Args('id') id: string): Promise<boolean> {
    return await this.product.deleteProduct(id);
  }

  @UseGuards(AuthGuard)
  @Mutation()
  async buyProduct(
    @Args('id') id: string,
    @User() user: USER,
  ): Promise<boolean> {
    if (user.id) return await this.product.buyProduct(id, user.id);
    else return false;
  }

  @UseGuards(AuthGuard)
  @Query()
  async getUserPurchases(@User() user: USER): Promise<PRODUCT[]> {
    if (user.id) return await this.product.getUserPurchases(user.id);
    else return [];
  }
}
