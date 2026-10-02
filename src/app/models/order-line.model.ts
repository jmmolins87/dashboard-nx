export interface OrderLineItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineDiscount: number;
  lineTotal: number;
}
