export type PRODUCT = {
  id?: string
  title: string
  categories: ProductCategory[]
  description: string
  purchasePrice: number
  rentPrice: number
  rentDuration: Rent_Duration
}
export type Rent_Duration = 'per day' | 'per week' | 'per month'

export enum ProductCategory {
  ELECTRONICS = 'Electronics',
  FURNITURE = 'Furniture',
  HOME_APPLIANCES = 'Home appliances',
  SPORTING_GOODS = 'Sporting goods',
  OUTDOOR = 'Outdoor',
  TOYS = 'Toys',
}

export enum AddProductViewStates {
  title = 0,
  categories = 1,
  description = 2,
  price = 3,
  summary = 4,
}
