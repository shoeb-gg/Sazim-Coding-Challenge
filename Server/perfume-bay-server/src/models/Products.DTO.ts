export type PRODUCT = {
  id?: string;
  title: string;
  categories: ProductCategory[];
  description: string;
  purchasePrice: number;
  rentPrice: number;
  rentDuration: Rent_Duration;
};
export type Rent_Duration = 'per day' | 'per week' | 'per month';

export enum ProductCategory {
  ELECTRONICS = 'Electronics',
  FURNITURE = 'Furniture',
  HOME_APPLIANCES = 'Home appliances',
  SPORTING_GOODS = 'Sporting goods',
  OUTDOOR = 'Outdoor',
  TOYS = 'Toys',
}
