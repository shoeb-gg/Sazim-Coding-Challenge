import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PRODUCT } from 'src/models/Products.DTO';
import { PURCHASE } from 'src/models/Purchase.DTO';
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
        where: {
          purchased: false,
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

  async getUserPurchases(userId: string): Promise<PRODUCT[]> {
    try {
      const purchases: PURCHASE[] = await this.prisma.pURCHASE.findMany({
        select: {
          id: true,
          purchase_dateTime: true,
          product_id: true,
        },
        where: {
          userId: userId,
        },
      });
      console.log(purchases);

      if (purchases.length === 0) return [];

      const productIds: string[] = [];

      purchases.forEach((purchase) => {
        productIds.push(purchase.product_id);
      });
      console.log(productIds);

      const purchasedProducts: PRODUCT[] = await this.prisma.pRODUCT.findMany({
        select: {
          id: true,
          title: true,
          categories: true,
          description: true,
          purchasePrice: true,
          rentPrice: true,
          rentDuration: true,
        },
        where: {
          id: {
            in: productIds,
          },
        },
      });

      console.log(productIds);

      return purchasedProducts;
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

  async buyProduct(productId: string, userId: string): Promise<boolean> {
    try {
      await this.prisma.pURCHASE.create({
        data: {
          product_id: productId,
          userId: userId,
        },
      });

      await this.prisma.pRODUCT.update({
        data: {
          purchased: true,
        },
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

  async getProductById(productId: string): Promise<PRODUCT> {
    try {
      const products: PRODUCT | null = await this.prisma.pRODUCT.findUnique({
        where: {
          id: productId,
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
