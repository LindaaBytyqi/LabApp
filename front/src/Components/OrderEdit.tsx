import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OrderService } from "../Services/OrderService";
import { OrderModel } from "../Interfaces/OrderModel";
import { Segment, Header, Divider, Form, Button } from "semantic-ui-react";
import { CreateOrder } from "../Interfaces/CreateOrder";
import Navbar from "./Navbar";

export default function OrderEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      try {
        const data = await OrderService.GetOrderById(id);
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!order) return;
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSave = async () => {
    if (!order) return;
    try {
      await OrderService.UpdateOrder(order); // duhet të ekzistojë funksioni UpdateOrder në OrderService
      alert("Order updated successfully!");
      navigate("/CoordinatorDashboard"); // ose redirect tek lista e orders
    } catch (err) {
      console.error("Error updating order:", err);
      alert("Failed to update order!");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found!</p>;

  return (
    <>
      <Navbar searchTerm={""} setSearchTerm={() => {}} />
      <Segment style={{ maxWidth: "600px", margin: "50px auto", marginTop: "120px" }}>
        <Header as="h2" dividing>Edit Order</Header>
        <Form>
          <Form.Field>
            <label>Full Name</label>
            <input
              name="fullName"
              value={order.fullName|| ""}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={order.email|| ""}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Phone</label>
            <input
              name="phone"
              value={order.phone|| ""}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Address</label>
            <input
              name="address"
              value={order.address|| ""}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>City</label>
            <input
              name="city"
              value={order.city|| ""}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>ZIP Code</label>
            <input
              name="zipCode"
              value={order.zipCode|| ""}
              onChange={handleChange}
            />
          </Form.Field>

          <Divider />

          <Header as="h4">Order Items (Read-only)</Header>
          <ul>
            {order.orderItems.map((item, index) => (
              <li key={index}>
                {item.title} (Qty: {item.quantity}) - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>

          <p><strong>Total:</strong> ${order.totalPrice?.toFixed(2)}</p>

          <Button color="green" onClick={handleSave}>
            Save Changes
          </Button>
        </Form>
      </Segment>
    </>
  );
}
