import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderService } from "../Services/OrderService";
import { OrderModel } from "../Interfaces/OrderModel";
import { Segment, Header, Divider } from "semantic-ui-react";
import Navbar from "./Navbar";

export default function OrderSuccess() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderModel | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      try {
        const data = await OrderService.GetOrderById(id);
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <>
      <Navbar searchTerm={""} setSearchTerm={() => {}} />
      <Segment style={{ maxWidth: "600px", margin: "50px auto", marginTop: "120px" }}>
        <Header as="h2" dividing>Order Confirmed!</Header>
        <p>Thank you, <strong>{order.fullName}</strong>! Your order has been placed.</p>
        <p>Order ID: <strong>{order.orderId}</strong></p>
        <Divider />
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Address:</strong> {order.address}, {order.city}, {order.zipCode}</p>
        <Divider />
        <p><strong>Items:</strong></p>
        <ul>
          {order.orderItems.map((item, index) => (
            <li key={index}>{item.title} (Qty: {item.quantity}) - ${item.price.toFixed(2)}</li>
          ))}
        </ul>
        <p><strong>Total:</strong> ${order.totalPrice?.toFixed(2)}</p>
      </Segment>
    </>
  );
}
