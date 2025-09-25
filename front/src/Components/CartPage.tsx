
import React, { useEffect, useState } from "react";
import { Container, Header, Button, Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = () => {
    const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
    setCartItems(guestCart);
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
    const listener = () => fetchCart();
    window.addEventListener("guestCartUpdated", listener);
    return () => window.removeEventListener("guestCartUpdated", listener);
  }, []);

  const handleRemove = (bookId: string) => {
    const newCart = cartItems.filter(item => item.bookId !== bookId);
    localStorage.setItem("guestCart", JSON.stringify(newCart));
    setCartItems(newCart);
  };

  const handleClear = () => {
    localStorage.removeItem("guestCart");
    setCartItems([]);
  };

  if (loading)
    return (
      <Container style={{ marginTop: "150px", textAlign: "center" }}>
        Loading cart...
      </Container>
    );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar searchTerm={""} setSearchTerm={() => {}} />
      <Container style={{ marginTop: "80px", maxWidth: "800px" }}>
        <Header as="h2" style={{ marginBottom: "20px" }}>
          Shopping cart
        </Header>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <Segment raised padded style={{ borderRadius: "10px" }}>
            {cartItems.map(item => (
              <div
                key={item.bookId}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #eee",
                  padding: "15px 0"
                }}
              >
                <img
                  src={
                    item.photoUrl ||
                    "https://via.placeholder.com/60x80?text=No+Image"
                  }
                  alt={item.title}
                  style={{
                    width: "60px",
                    height: "80px",
                    objectFit: "cover",
                    marginRight: "15px"
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 5px 0" }}>{item.title}</h4>
                  <p style={{ margin: 0, color: "#666" }}>
                    {/* <strong>Category:</strong> {item.category} */}
                     <strong>Author(s):</strong> {item.authors}
                  </p>
                  <p style={{ margin: 0, color: "#666" }}>
                    <strong>Qty:</strong> {item.quantity}
                  </p>
                  <Button
                    basic
                    size="tiny"
                    color="red"
                    style={{ marginTop: "5px" }}
                    onClick={() => handleRemove(item.bookId)}
                  >
                    Remove
                  </Button>
                </div>

                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: "20px",
                paddingTop: "15px",
                borderTop: "2px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <p style={{ margin: 0 }}>
                  <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
                </p>
                <small style={{ color: "#666" }}>
                  Shipping and taxes calculated at checkout.
                </small>
              </div>
              <Button
                color="blue"
                size="large"
                onClick={() => navigate("/checkout", { state: { cartItems } })}
              >
                Checkout
              </Button>
            </div>

            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <Button basic onClick={() => navigate("/")}>
                Continue Shopping →
              </Button>
              <Button
                basic
                color="red"
                style={{ marginLeft: "10px" }}
                onClick={handleClear}
              >
                Clear Cart
              </Button>
            </div>
          </Segment>
        )}
      </Container>
    </>
  );
}
