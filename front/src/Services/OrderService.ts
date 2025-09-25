import axios from "axios";
import { CreateOrder } from "../Interfaces/CreateOrder";
import { OrderModel } from "../Interfaces/OrderModel";

export class OrderService {
  private static baseUrl = "https://localhost:7141/api/Order";

  public static async CreateOrder(model: CreateOrder): Promise<OrderModel> {
    const result = await axios.post<OrderModel>(`${this.baseUrl}`, model);
    return result.data;
  }

  public static async GetAllOrders(): Promise<OrderModel[]> {
    const result = await axios.get<OrderModel[]>(`${this.baseUrl}`);
    return result.data;
  }

  public static async GetOrderById(id: string): Promise<OrderModel> {
    const result = await axios.get<OrderModel>(`${this.baseUrl}/${id}`);
    return result.data;
  }
   public static async UpdateOrder(order: OrderModel): Promise<OrderModel> {
    const result = await axios.put<OrderModel>(
      `${this.baseUrl}/${order.orderId}`,
      order
    );
    return result.data;
  }

}
