import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookService } from "../Services/BookService";
import { BookModel } from "../Interfaces/BookModel";
import { Button } from "semantic-ui-react";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookModel | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      BookService.GetBooksDetails(id).then(setBook).catch(console.error);
    }
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.description}</p>
      <p><b>Author(s):</b> {book.authorNames?.join(", ") || "Unknown"}</p>
      <p><b>Category ID:</b> {book.categoryId}</p>
      <p><b>Publisher ID:</b> {book.publisherId}</p>
      {book.photoUrl && <img src={`https://localhost:7141${book.photoUrl}`} alt={book.title || ''} />}
      <div style={{ marginTop: "20px" }}>
        <Button color="blue" onClick={() => navigate(`/book-added/${book.id}`, { state: { book } })}>
          Confirm Book
        </Button>
      </div>
    </div>
  );
}








// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { BookService } from "../Services/BookService";
// import { BookModel } from "../Interfaces/BookModel";
// import { Button } from "semantic-ui-react";
// import { CartItemModel } from "../Interfaces/CartItemModel";
// import { CartService } from "../Services/CartService";

// export default function BookDetails(): JSX.Element {
//   const { id } = useParams<{ id: string }>();
//   const [book, setBook] = useState<BookModel | null>(null);
//   const navigate = useNavigate();
//   const userId = "test-user";

//   useEffect(() => {
//     if (id) {
//       BookService.GetBooksDetails(id).then(setBook);
//     }
//   }, [id]);

//   async function handleAddToCart() {
//       if (!book || !book.id) return;


//     const cartItem: CartItemModel = {
//       bookId: book.id,
//       quantity: 1,
//       title: book.title || "Unknown Title",
//       category: book.categoryId || "Unknown Category",
//       price: book.price ?? 0,
//     };

//     await CartService.AddToCart(userId, cartItem);
//     navigate(`/book-added/${book.id}`, { state: { book } });
//   };

//   // Në vend të `return undefined` përdor null ose JSX
//   return (
//     <div>
//       {!book ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <h2>{book.title}</h2>
//           <p>{book.description}</p>
//           <p><b>Author(s):</b> {book.authorNames?.join(", ") || "Unknown"}</p>
//           <p><b>Category ID:</b> {book.categoryId}</p>
//           <p><b>Publisher ID:</b> {book.publisherId}</p>
//           {book.photoUrl && (
//             <img
//               src={`https://localhost:7141${book.photoUrl}`}
//               alt={book.title || ''}
//             />
//           )}
//           <div style={{ marginTop: "20px" }}>
//             <Button color="blue" onClick={handleAddToCart}>Add to Cart</Button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }