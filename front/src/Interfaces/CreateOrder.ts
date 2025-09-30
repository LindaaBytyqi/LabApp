import { CreateOrderItem } from "./CreateOrderItem";
import { PaymentMethod } from "./PaymentMethod";

export interface CreateOrder {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  items: CreateOrderItem[];
  paymentMethod: PaymentMethod;
}