import React, { useEffect, useState, Fragment } from "react";
import { Table, Button, Confirm } from "semantic-ui-react";
import { CartModel } from "../Interfaces/CartModel";
import { CartItemModel } from "../Interfaces/CartItemModel";
import { CartService } from "../Services/CartService";
import { useNavigate } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';

export default function CartTable() {
  const [cart, setCart] = useState<CartModel>({
    Id: "",
    UserId: "some-user-id", // vendos UserId aktual
    Items: []
  });

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteBookId, setDeleteBookId] = useState<string>("");

  const navigate = useNavigate();

  const fetchCart = async () => {
    const result = await CartService.GetCart(cart.UserId);
    setCart(result);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  
  
//   const subtotal = cart.Items.reduce((acc, item) => {
//   return acc + (item.Price * item.Quantity);
//     }, 0);

  const handleRemoveItem = (bookId: string) => {
    setDeleteBookId(bookId);
    setOpenConfirm(true);
  };

  const confirmRemoveItem = async () => {
    await CartService.RemoveFromCart(cart.UserId, deleteBookId);
    setCart({
      ...cart,
      Items: cart.Items.filter(i => i.BookId !== deleteBookId)
    });
    setOpenConfirm(false);
  };

  const handleClearCart = async () => {
    await CartService.ClearCart(cart.UserId);
    setCart({ ...cart, Items: [] });
  };

  const editItem = (bookId: string) => {
    navigate(`/EditCartItem/${bookId}`);
  };

  const totalItems = cart.Items.reduce((acc, item) => acc + item.Quantity, 0);
  const subtotal = cart.Items.reduce((acc, item) => acc + (item.Price * item.Quantity), 0);



  return (
    <Fragment>
      <h1 style={{ marginLeft: "15px" }}>My Cart</h1>
      <Button color="red" onClick={handleClearCart} style={{ margin: "10px" }}>
        Clear Cart
      </Button>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {cart.Items.map((item) => (
            <Table.Row key={item.BookId}>
              <Table.Cell>{item.Title}</Table.Cell>
              <Table.Cell>{item.Category}</Table.Cell>
              <Table.Cell>{item.Price}</Table.Cell>
              <Table.Cell>{item.Quantity}</Table.Cell>
              <Table.Cell>
                <Button color="green" onClick={() => editItem(item.BookId)}>Edit</Button>
                <Button color="red" onClick={() => handleRemoveItem(item.BookId)}>Remove</Button>
              </Table.Cell>
            </Table.Row>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={confirmRemoveItem}
          />
        </Table.Body>
      </Table>
     <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
    <Button color="blue" onClick={() => navigate('/books')}>
      Continue Shopping
    </Button>

    <div>
      <span>Total Items: {totalItems} | </span>
      <strong>Subtotal: ${subtotal.toFixed(2)}</strong>
      <Button color="green" style={{ marginLeft: "10px" }} onClick={() => navigate('/checkout')}>
        Checkout
      </Button>
    </div>
  </div>  
    </Fragment>
  );
}
