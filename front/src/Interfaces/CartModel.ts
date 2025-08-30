import { CartItemModel } from "./CartItemModel";

export interface CartModel {
  id: string;
  userId: string;
  items: CartItemModel[];
}
