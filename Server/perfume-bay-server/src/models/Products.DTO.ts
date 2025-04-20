export type PRODUCT = {
  id?: string;
  title: string;
  categories: string[];
  description: string;
  purchasePrice: number;
  rentPrice: number;
  rentDuration: string;
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
