import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Header,
  Image,
  Button,
  Icon,
} from "semantic-ui-react";
import { CartItemModel } from "../Interfaces/CartItemModel";
import { CartService } from "../Services/CartService";
import { UserService } from "../Services/UserService";
export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);

  // In a real app, you would get the user ID from an authentication state.
  // We will use a mock user ID for now.
  //const userId = "test-user";
  const userId=UserService.getUserId();

  useEffect(() => {
    // This effect runs once on component mount to fetch the cart data.
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const cartData = await CartService.GetCart(userId);
        setCartItems(cartData.items);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    // This effect calculates the subtotal whenever the cart items change.
    const newSubtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  }, [cartItems]);

  const handleRemoveItem = async (bookId: string) => {
    try {
      // Calls the service to remove the item from the backend (mocked).
      await CartService.RemoveFromCart(userId, bookId);
      // Updates the local state to reflect the change immediately.
      setCartItems(cartItems.filter((item) => item.bookId !== bookId));
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      // Calls the service to clear the entire cart.
      await CartService.ClearCart(userId);
      // Clears the local state.
      setCartItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  if (loading) {
    return (
      <Container style={{ marginTop: "150px", textAlign: "center" }}>
        <p>Loading your cart...</p>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: "150px", marginBottom: "50px" }}>
      <Grid stackable>
        <Grid.Column width={16}>
          <Header as="h1" style={{ fontSize: "2.5em" }}>
            Shopping Cart
          </Header>
        </Grid.Column>
      </Grid>
      <Grid stackable>
        <Grid.Column width={12}>
          {cartItems.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "1.2em", color: "#666" }}>
              Your cart is empty.
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.bookId}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(17, 16, 16, 0.1)",
                  border: "1px solid #ddd",
                  marginBottom: "20px",
                  backgroundColor: "white",
                }}
              >
                {/* <Image
                  src={item.photoUrl}
                  style={{
                    width: "100px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginRight: "20px",
                  }}
                /> */}
                <div style={{ flexGrow: 1 }}>
                  <Header as="h3" style={{ margin: "0" }}>
                    {item.title}
                  </Header>
                  <p style={{ margin: "5px 0" }}>Category: {item.category}</p>
                  <p style={{ margin: "5px 0" }}>Quantity: {item.quantity}</p>
                  <p style={{ margin: "5px 0", fontWeight: "bold" }}>
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <Button
                    onClick={() => handleRemoveItem(item.bookId)}
                    color="red"
                    size="small"
                    style={{ marginTop: "10px" }}
                  >
                    <Icon name="trash" /> Remove
                  </Button>
                </div>
                <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </Grid.Column>
        <Grid.Column width={4}>
          <div
            style={{
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(17, 16, 16, 0.1)",
              border: "1px solid #ddd",
              backgroundColor: "white",
            }}
          >
            <Header as="h3" style={{ margin: "0 0 10px 0" }}>
              Order Summary
            </Header>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                Subtotal
              </span>
              <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <Button primary fluid size="large">
              Proceed to Checkout
            </Button>
            <p style={{ textAlign: "center", marginTop: "15px" }}>
              <Link to="/" style={{ color: "#666" }}>
                Continue Shopping
              </Link>
            </p>
            {cartItems.length > 0 && (
              <Button
                fluid
                size="small"
                onClick={handleClearCart}
                style={{ marginTop: "10px" }}
              >
                Clear Cart
              </Button>
            )}
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
