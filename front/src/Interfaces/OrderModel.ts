import { OrderItemModel } from "./OrderItemModel";

export interface OrderModel {
  orderId: string|null;      // Guid → string
  fullName: string|null;
  email: string|null;
  phone: string|null;
  address: string|null;
  city: string|null;
  zipCode: string|null;
  totalPrice: number|null;   // decimal → number
  createdAt: string|null;    // DateTime → string (ose Date nqs e pars-on)
  orderItems: OrderItemModel[];
}