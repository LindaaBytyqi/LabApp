import { CartItemModel } from "./CartItemModel";

export interface CartModel {
  Id: string;
  UserId: string;
  Items: CartItemModel[];
}
