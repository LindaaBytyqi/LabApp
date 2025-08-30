import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Order } from "../Interfaces/OrderModel";
import { OrderService } from "../Services/OrderService";

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        const data = await OrderService.GetOrderById(id);
        setOrder(data);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div style={{ margin: "20px" }}>
      <h2>Order Summary</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Name:</strong> {order.fullName}</p>
      <p><strong>Email:</strong> {order.email}</p>
      <p><strong>Phone:</strong> {order.phone}</p>
      <p><strong>Address:</strong> {order.address}, {order.city}, {order.zipCode}</p>
      <p><strong>Total:</strong> {order.totalPrice} €</p>
      <h3>Items:</h3>
      <ul>
        {order.orderItems.map((item, index) => (
          <li key={index}>
            {item.title} - {item.quantity} × {item.price} €
          </li>
        ))}
      </ul>
    </div>
  );
}
