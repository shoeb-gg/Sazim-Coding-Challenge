export type PURCHASE = {
  id?: string;
  purchase_dateTime?: Date;
  product_id: string;
  userId?: string;
};

export type PURCHASE_Response = {
  id?: string;
  purchase_dateTime: string;
  product_id: string;
  userId?: string;
};
