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
      console.error(error);
      throw new HttpException(
        'Server Error while creating user!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductForUser(userId: string): Promise<PRODUCT[]> {
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
      console.error(error);
      throw new HttpException(
        'Server Error while finding products data!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductById(userId: string, productId: string): Promise<PRODUCT> {
    try {
      const products: PRODUCT | null = await this.prisma.pRODUCT.findUnique({
        where: {
          id: productId,
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

      if (products) {
        return products;
      } else {
        throw new HttpException(
          'No Unique Products found!',
          HttpStatus.NO_CONTENT,
        );
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while finding products data!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
