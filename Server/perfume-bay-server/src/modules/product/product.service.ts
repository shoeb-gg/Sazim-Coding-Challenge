import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PRODUCT } from 'src/models/Products.DTO';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(productData: PRODUCT, userId: string): Promise<PRODUCT> {
    try {
      const newProduct = await this.prisma.pRODUCT.create({
        data: { ...productData, userId: userId },
      });

      return newProduct as PRODUCT;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Server Error while creating user!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductsById(userId: string): Promise<PRODUCT[]> {
    try {
      const products: PRODUCT[] = await this.prisma.pRODUCT.findMany({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          title: true,
          categories: true,
          description: true,
          purchasePrice: true,
          rentPrice: true,
          rentDuration: true,
        },
      });

      return products;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Server Error while finding products data!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
