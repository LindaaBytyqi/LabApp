import axios from "axios";
import { CreateOrder } from "../Interfaces/CreateOrder";
import { Order } from "../Interfaces/OrderModel";

export class OrderService {
  private static baseUrl = "https://localhost:7141/api/Order";

  
  public static async CreateOrder(model: CreateOrder): Promise<Order> {
    const result = await axios.post<Order>(`${this.baseUrl}`, model);
    return result.data;
  }


  public static async GetAllOrders(): Promise<Order[]> {
    const result = await axios.get<Order[]>(`${this.baseUrl}`);
    return result.data;
  }

  
  public static async GetOrderById(id: string): Promise<Order> {
    const result = await axios.get<Order>(`${this.baseUrl}/${id}`);
    return result.data;
  }
}
