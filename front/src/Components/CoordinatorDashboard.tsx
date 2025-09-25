import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { OrderService } from "../Services/OrderService";

export default function CoordinatorDashboard() {
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await OrderService.GetAllOrders();
        setTotalOrders(orders.length);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Coordinator Dashboard</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Card
            className="shadow-sm border-0"
            style={{ backgroundColor: "#198754", color: "white" }}
          >
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <h3>{totalOrders}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
