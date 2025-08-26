import { CartModel } from "../Interfaces/CartModel";
import { CartItemModel } from "../Interfaces/CartItemModel";
import axios from "axios";

export class CartService {
  private static baseUrl = "https://localhost:7141/api/Cart";

  // Merr cart për user
  public static async GetCart(userId: string): Promise<CartModel> {
    const result = await axios.get(`${CartService.baseUrl}/${userId}`);
    return result.data;
  }

  // Shton ose edito një item në cart
  public static async AddToCart(userId: string, model: CartItemModel): Promise<void> {
    await axios.post(`${CartService.baseUrl}/${userId}`, model);
  }

  // Fshin një item nga cart
  public static async RemoveFromCart(userId: string, bookId: string): Promise<void> {
    await axios.delete(`${CartService.baseUrl}/${userId}/${bookId}`);
  }

  // Pastron të gjithë cart
  public static async ClearCart(userId: string): Promise<void> {
    await axios.delete(`${CartService.baseUrl}/clear/${userId}`);
  }
}
