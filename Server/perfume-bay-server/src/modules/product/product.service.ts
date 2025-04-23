import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PRODUCT } from 'src/models/Products.DTO';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async updateProduct(
    productData: PRODUCT,
    userId: string | undefined,
  ): Promise<PRODUCT> {
    try {
      const updatedProduct = await this.prisma.pRODUCT.update({
        data: { ...productData, userId: userId },
        where: {
          id: productData.id,
        },
      });

      return updatedProduct as PRODUCT;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while updatng product!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createProduct(
    productData: PRODUCT,
    userId: string | undefined,
  ): Promise<PRODUCT> {
    try {
      const newProduct = await this.prisma.pRODUCT.create({
        data: { ...productData, userId: userId },
      });

      return newProduct as PRODUCT;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while creating product!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductForUser(userId: string | undefined): Promise<PRODUCT[]> {
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

  async getAllProducts(): Promise<PRODUCT[]> {
    try {
      const products: PRODUCT[] = await this.prisma.pRODUCT.findMany({
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

  async deleteProduct(productId: string): Promise<boolean> {
    try {
      await this.prisma.pRODUCT.delete({
        where: {
          id: productId,
        },
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getProductById(
    userId: string | undefined,
    productId: string,
  ): Promise<PRODUCT> {
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
        throw new HttpException('No Products found!', HttpStatus.NO_CONTENT);
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
