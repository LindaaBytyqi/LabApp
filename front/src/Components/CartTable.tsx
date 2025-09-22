import { Fragment, useEffect, useState } from "react";
import { Button, Table } from "semantic-ui-react";
import { CartModel } from "../Interfaces/CartModel";
import { CartService } from "../Services/CartService";
import { useNavigate } from "react-router-dom";

export default function CartTable() {
  const [cart, setCart] = useState<CartModel>({ id: "", userId: "test-user", items: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const result = await CartService.GetCart(cart.userId);
      setCart(result);
    };
    fetchCart();
  }, []);

  const subtotal = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Fragment>
      <h1>My Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cart.items.map(item => (
              <Table.Row key={item.bookId}>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell>${item.price}</Table.Cell>
                <Table.Cell>{item.quantity}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <Button color="blue" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
        <div>
          <span>Total Items: {totalItems} | </span>
          <strong>Subtotal: ${subtotal.toFixed(2)}</strong>
          <Button color="green" style={{ marginLeft: "10px" }} onClick={() => navigate('/checkout', { state: { cartItems: cart.items } })}>
            Checkout
          </Button>
        </div>
      </div>
    </Fragment>
  );
}














// import React, { Fragment, useEffect, useState } from "react";
// import {
//   Table,
//   Button,
//   Confirm,
//   TableHeader,
//   TableRow,
//   TableHeaderCell,
//   TableBody,
//   TableCell
// } from "semantic-ui-react";
// import 'semantic-ui-css/semantic.min.css';
// import { useNavigate } from "react-router-dom";
// import { CartModel } from "../Interfaces/CartModel";
// import { CartService } from "../Services/CartService";

// export default function CartTable() {
//   const [cart, setCart] = useState<CartModel>({ id: '', userId: '', items: [] });
//   const [openConfirm, setOpenConfirm] = useState<boolean>(false);
//   const [deleteBookId, setDeleteBookId] = useState<string>("");
//   const navigate = useNavigate();

//   //const userId = "some-user-id"; // <-- vendos UserId aktual
//   const userId = "test-user";

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const result = await CartService.GetCart(userId);
//   //     setCart(result);
//   //   };
//   //   fetchData();
//   // }, []);

//    useEffect(() => {
//   const fetchCart = async () => {
//     const result = await CartService.GetCart(userId);
//     setCart(result);
//   };
//   fetchCart();
// }, [userId]);

//   function deleteItem(bookId: string) {
//     setOpenConfirm(true);
//     setDeleteBookId(bookId);
//   }

//   async function confirmedDeleteItem(bookId: string) {
//     await CartService.RemoveFromCart(userId, bookId);
//     setCart({ ...cart, items: cart.items.filter(i => i.bookId !== bookId) });
//     setOpenConfirm(false);
//     setDeleteBookId("");
//   }

//   function editItem(bookId: string) {
//     navigate(`/EditCart/${bookId}`);
//   }

//   return (
//     <Fragment>
//       <h1 style={{ marginLeft: "30px" }}>My Cart</h1>
//       <Table striped>
//         <TableHeader>
//           <TableRow>
//             <TableHeaderCell>Title</TableHeaderCell>
//             <TableHeaderCell>Category</TableHeaderCell>
//             <TableHeaderCell>Price</TableHeaderCell>
//             <TableHeaderCell>Quantity</TableHeaderCell>
//             <TableHeaderCell>Actions</TableHeaderCell>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {cart.items.map((item) => (
//             <TableRow key={item.bookId}>
//               <TableCell>{item.title}</TableCell>
//               <TableCell>{item.category}</TableCell>
//               <TableCell>{item.price}</TableCell>
//               <TableCell>{item.quantity}</TableCell>
//               <TableCell>
//                 <Button color="green" onClick={() => editItem(item.bookId)}>Edit</Button>
//                 <Button color="red" onClick={() => deleteItem(item.bookId)}>Delete</Button>
//               </TableCell>
//             </TableRow>
//           ))}
//           <Confirm
//             open={openConfirm}
//             onCancel={() => setOpenConfirm(false)}
//             onConfirm={() => confirmedDeleteItem(deleteBookId)}
//           />
//         </TableBody>
//       </Table>
//     </Fragment>
//   );
// }



// Inside CartTable.tsx
// import { Fragment, useEffect, useState } from "react";
// import { Button, Confirm, Image } from "semantic-ui-react";
// import { CartModel } from "../Interfaces/CartModel";
// import { CartService } from "../Services/CartService";
// import { useNavigate } from "react-router-dom";
// import 'semantic-ui-css/semantic.min.css';

// export default function CartTable() {
//     const [cart, setCart] = useState<CartModel>({ id: '', userId: '', items: [] });
//     const [openConfirm, setOpenConfirm] = useState<boolean>(false);
//     const [deleteBookId, setDeleteBookId] = useState<string>("");
//     const navigate = useNavigate();
//     const userId = "test-user"; // Use a consistent user ID

//     useEffect(() => {
//         const fetchCart = async () => {
//             const result = await CartService.GetCart(userId);
//             setCart(result);
//         };
//         fetchCart();
//     }, [userId]);

//     const handleRemoveItem = (bookId: string) => {
//         setDeleteBookId(bookId);
//         setOpenConfirm(true);
//     };

//     const confirmRemoveItem = async () => {
//         await CartService.RemoveFromCart(userId, deleteBookId);
//         setCart({ ...cart, items: cart.items.filter(i => i.bookId !== deleteBookId) });
//         setOpenConfirm(false);
//     };

//     const handleClearCart = async () => {
//         await CartService.ClearCart(userId);
//         setCart({ ...cart, items: [] });
//     };

//     const subtotal = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

//     return (
//         <Fragment>
//             <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//                     <h1 style={{ fontSize: '2em' }}>Shopping cart</h1>
//                     <Button color='red' onClick={handleClearCart}>Clear Cart</Button>
//                 </div>

//                 {cart.items.length === 0 ? (
//                     <p>Your cart is empty.</p>
//                 ) : (
//                     <div>
//                         {cart.items.map((item) => (
//                             <div key={item.bookId} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '10px' }}>
//                                 {/* Placeholder for book image */}
//                                 <Image src={`https://localhost:7141${item.photoUrl}`} size='tiny' style={{ marginRight: '15px' }} />
//                                 <div style={{ flexGrow: 1 }}>
//                                     <h4 style={{ margin: '0' }}>{item.title}</h4>
//                                     <p style={{ color: '#666', margin: '0' }}>Category: {item.category}</p>
//                                     <p style={{ color: '#666', margin: '0' }}>Qty: {item.quantity}</p>
//                                 </div>
//                                 <div style={{ textAlign: 'right' }}>
//                                     <span style={{ fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</span>
//                                     <p style={{ margin: '0', cursor: 'pointer', color: 'red' }} onClick={() => handleRemoveItem(item.bookId)}>Remove</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
                
//                 <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '30px' }}>
//                     <div style={{ marginRight: '20px', textAlign: 'right' }}>
//                         <h4 style={{ margin: '0' }}>Subtotal: ${subtotal.toFixed(2)}</h4>
//                         <p style={{ margin: '0', fontSize: '0.9em', color: '#666' }}>Shipping and taxes calculated at checkout.</p>
//                     </div>
//                     <Button color='violet' size='large' onClick={() => navigate('/checkout', { state: { cartItems: cart.items } })}>
//                         Checkout
//                     </Button>
//                 </div>
                
//                 <div style={{ textAlign: 'center', marginTop: '10px' }}>
//                     <a style={{ cursor: 'pointer', color: '#337ab7' }} onClick={() => navigate('/books')}>
//                         or Continue Shopping →
//                     </a>
//                 </div>

//                 <Confirm
//                     open={openConfirm}
//                     onCancel={() => setOpenConfirm(false)}
//                     onConfirm={confirmRemoveItem}
//                 />
//             </div>
//         </Fragment>
//     );
// }


