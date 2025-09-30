import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OrderService } from "../Services/OrderService"; // Importimi i OrderService
import { OrderModel } from "../Interfaces/OrderModel"; 
import { Container, Form, Button, Card, Alert, Row, Col, ListGroup } from "react-bootstrap";
import Navbar from "./Navbar"; // Nëse keni nevojë për Navigacionin e përgjithshëm

const PaymentLabels = {
  0: "Cash on Delivery",
  1: "Online Payment",
};

export default function OrderEdit() {
  // Përdorim useParams për të marrë ID nga URL (p.sh., /OrderEdit/id-porosie)
  const { id } = useParams<{ id: string }>(); 
  const [order, setOrder] = useState<OrderModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'danger', text: string } | null>(null);

  // Marrja e të dhënave të porosisë
  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      try {
        const data = await OrderService.GetOrderById(id);
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setMessage({ type: 'danger', text: "Nuk u gjet porosia me ID: " + id });
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  // Përditësimi i State kur ndryshohet një fushë
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrder(prevOrder => ({
      ...prevOrder!,
      [name]: value,
    }));
  };

  // Funksioni për Ruajtjen e ndryshimeve (Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    setIsUpdating(true);
    setMessage(null);
    try {
      // Thirrja e funksionit tuaj të ri UpdateOrder
      await OrderService.UpdateOrder(order); 
      setMessage({ type: 'success', text: "Porosia u përditësua me sukses! Adresa/detajet janë ndryshuar." });

    } catch (err) {
      console.error("Error updating order:", err);
      setMessage({ type: 'danger', text: "Dështoi përditësimi i porosisë. Sigurohuni që jeni i autorizuar." });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <Container className="mt-5" style={{ paddingLeft: "100px" }}><p>Duke ngarkuar porosinë...</p></Container>;
  if (!order) return <Container className="mt-5" style={{ paddingLeft: "100px" }}><Alert variant="warning">Porosia nuk u gjet ose ID është e pavlefshme.</Alert></Container>;

  return (
    // Shtojmë padding majtas që të mos mbulohet nga Sidebar
    <Container className="mt-5" style={{ paddingLeft: "100px" }}>
      <h2>Edito Porosinë e Klientit: **{order.fullName}**</h2>
      <p className="text-muted">ID: {order.orderId}</p>
      <hr />
      
      {message && <Alert variant={message.type}>{message.text}</Alert>}

      <Row>
        {/* Kolona e Editimit të Detajeve të Klientit */}
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Header as="h5">Detajet e Klientit & Adresa</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Adresa */}
                <Form.Group className="mb-3">
                  <Form.Label>Adresa Komplete</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={order.address ?? ''}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Qyteti */}
                <Form.Group className="mb-3">
                  <Form.Label>Qyteti</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={order.city ?? ''}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                {/* Telefoni */}
                <Form.Group className="mb-3">
                  <Form.Label>Telefoni</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={order.phone ?? ''}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Butoni i Ruajtjes */}
                <Button variant="primary" type="submit" disabled={isUpdating}>
                  {isUpdating ? 'Saving...' : 'Save changes'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Kolona e Detajeve të Porosisë (Vetëm Lexim) */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header as="h5">Përmbledhje & Artikujt</Card.Header>
            <Card.Body>
              <p> **Metoda e Pagesës:** {PaymentLabels[order.paymentMethod]}</p>
              <p> **Email:** {order.email}</p>
              <h5 className="mt-3">Artikujt e Porosisë:</h5>
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    {item.title} (Qty: {item.quantity})
                    <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <h4 className="mt-3 text-end">**Total: ${order.totalPrice?.toFixed(2)}**</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { OrderService } from "../Services/OrderService";
// import { OrderModel } from "../Interfaces/OrderModel";
// import { Segment, Header, Divider, Form, Button } from "semantic-ui-react";
// import { CreateOrder } from "../Interfaces/CreateOrder";
// import Navbar from "./Navbar";

// export default function OrderEdit() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState<OrderModel | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       if (!id) return;
//       try {
//         const data = await OrderService.GetOrderById(id);
//         setOrder(data);
//       } catch (err) {
//         console.error("Error fetching order:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!order) return;
//     const { name, value } = e.target;
//     setOrder({ ...order, [name]: value });
//   };

//   const handleSave = async () => {
//     if (!order) return;
//     try {
//       await OrderService.UpdateOrder(order); // duhet të ekzistojë funksioni UpdateOrder në OrderService
//       alert("Order updated successfully!");
//       navigate("/CoordinatorDashboard"); // ose redirect tek lista e orders
//     } catch (err) {
//       console.error("Error updating order:", err);
//       alert("Failed to update order!");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!order) return <p>Order not found!</p>;

//   return (
//     <>
//       <Navbar searchTerm={""} setSearchTerm={() => {}} />
//       <Segment style={{ maxWidth: "600px", margin: "50px auto", marginTop: "120px" }}>
//         <Header as="h2" dividing>Edit Order</Header>
//         <Form>
//           <Form.Field>
//             <label>Full Name</label>
//             <input
//               name="fullName"
//               value={order.fullName|| ""}
//               onChange={handleChange}
//             />
//           </Form.Field>

//           <Form.Field>
//             <label>Email</label>
//             <input
//               name="email"
//               type="email"
//               value={order.email|| ""}
//               onChange={handleChange}
//             />
//           </Form.Field>

//           <Form.Field>
//             <label>Phone</label>
//             <input
//               name="phone"
//               value={order.phone|| ""}
//               onChange={handleChange}
//             />
//           </Form.Field>

//           <Form.Field>
//             <label>Address</label>
//             <input
//               name="address"
//               value={order.address|| ""}
//               onChange={handleChange}
//             />
//           </Form.Field>

//           <Form.Field>
//             <label>City</label>
//             <input
//               name="city"
//               value={order.city|| ""}
//               onChange={handleChange}
//             />
//           </Form.Field>

//           <Form.Field>
//             <label>ZIP Code</label>
//             <input
//               name="zipCode"
//               value={order.zipCode|| ""}
//               onChange={handleChange}
//             />
//           </Form.Field>

//           <Divider />

//           <Header as="h4">Order Items (Read-only)</Header>
//           <ul>
//             {order.orderItems.map((item, index) => (
//               <li key={index}>
//                 {item.title} (Qty: {item.quantity}) - ${item.price.toFixed(2)}
//               </li>
//             ))}
//           </ul>

//           <p><strong>Total:</strong> ${order.totalPrice?.toFixed(2)}</p>

//           <Button color="green" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </Form>
//       </Segment>
//     </>
//   );
// }
