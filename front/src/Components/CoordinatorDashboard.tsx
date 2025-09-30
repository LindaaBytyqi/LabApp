// import { FaEdit as FaEditIcon } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderService } from "../Services/OrderService";
import { OrderModel } from "../Interfaces/OrderModel"; 
import { Container, Table, Button, Alert, Row, Col, Card } from "react-bootstrap";
// import { FaEdit } from "react-icons/fa"; // ✅ Importo ikonën e pencil-it
import { FaEdit } from "react-icons/fa";
import { IconType } from "react-icons";

const PaymentLabels: Record<number, string> = {
  0: "Cash on Delivery",
  1: "Online Payment",
};

export default function CoordinatorDashboard() {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const FaEditIcon: IconType = FaEdit;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await OrderService.GetAllOrders();
        setOrders(fetchedOrders);
      } catch (err) {
        console.error(err);
        setError("Nuk u arrit të merren porositë.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Coordinator Dashboard</h2>

      {/* Karta për Total Orders */}
      <Row className="mb-4 justify-content-center">
        <Col md={3}> 
          <Card 
            className="shadow-sm text-center"
            style={{ 
              border: "2px solid #0d6efd", // ✅ vijë blu
              borderRadius: "10px", 
              backgroundColor: "#f8f9fa" // ngjyrë e lehtë
            }}
          >
            <Card.Body>
              <Card.Title className="text-primary">Total Orders</Card.Title>
              <h3 className="fw-bold">{orders.length}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3 className="my-4">Lista e Porosive Aktive</h3>

      {loading ? (
        <p>Duke ngarkuar porositë...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : orders.length === 0 ? (
        <Alert variant="info">Nuk ka porosi të regjistruara.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>OrderID</th>
              <th>Client</th>
              <th>Address</th>
              <th>Total</th>
              <th>Phone</th>
              <th>PaymentMethod</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
              <td>{order.orderId?.substring(0, 8) + "..."}</td>
              <td>{order.fullName}</td>
              <td>{order.address}, {order.city}</td>
              <td>${order.totalPrice?.toFixed(2)}</td>
              <td>{order.phone}</td>
              <td>{PaymentLabels[order.paymentMethod]}</td>
                <td>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={() => navigate(`/orderedit/${order.orderId}`)}
                  >
                    <FaEditIcon /> Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
