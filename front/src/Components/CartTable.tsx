import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  Button,
  Confirm,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { useNavigate } from "react-router-dom";
import { CartModel } from "../Interfaces/CartModel";
import { CartService } from "../Services/CartService";

export default function CartTable() {
  const [cart, setCart] = useState<CartModel>({ id: '', userId: '', items: [] });
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteBookId, setDeleteBookId] = useState<string>("");
  const navigate = useNavigate();

  //const userId = "some-user-id"; // <-- vendos UserId aktual
  const userId = "test-user";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await CartService.GetCart(userId);
  //     setCart(result);
  //   };
  //   fetchData();
  // }, []);

//   useEffect(() => {
//   const fetchCart = async () => {
//     const result = await CartService.GetCart(userId);
//     setCart(result);
//   };
//   fetchCart();
// }, [userId]); 

   useEffect(() => {
  const fetchCart = async () => {
    const result = await CartService.GetCart(userId);
    setCart(result);
  };
  fetchCart();
}, [userId]);

  function deleteItem(bookId: string) {
    setOpenConfirm(true);
    setDeleteBookId(bookId);
  }

  async function confirmedDeleteItem(bookId: string) {
    await CartService.RemoveFromCart(userId, bookId);
    setCart({ ...cart, items: cart.items.filter(i => i.bookId !== bookId) });
    setOpenConfirm(false);
    setDeleteBookId("");
  }

  function editItem(bookId: string) {
    navigate(`/EditCart/${bookId}`);
  }

  return (
    <Fragment>
      <h1 style={{ marginLeft: "30px" }}>My Cart</h1>
      <Table striped>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Quantity</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.items.map((item) => (
            <TableRow key={item.bookId}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <Button color="green" onClick={() => editItem(item.bookId)}>Edit</Button>
                <Button color="red" onClick={() => deleteItem(item.bookId)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteItem(deleteBookId)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
