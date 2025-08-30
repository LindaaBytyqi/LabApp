import { CreateOrderItem } from "./CreateOrderItem";

export interface CreateOrder {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  items: CreateOrderItem[];
}