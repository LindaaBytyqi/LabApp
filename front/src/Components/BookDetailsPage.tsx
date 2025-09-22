import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookModel } from "../Interfaces/BookModel";
import { BookService } from "../Services/BookService";
import { Container, Grid, Header, Image, Button } from "semantic-ui-react";
import Navbar from "./Navbar";
import QuantityControl from "./QuantityControl";
import { useNavigate } from "react-router-dom";
import { CartService } from "../Services/CartService";
import { CartItemModel } from "../Interfaces/CartItemModel";
import { UserService } from "../Services/UserService";

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookModel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const userId = UserService.getUserId();
  const navigate=useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (id) {
        try {
          const bookDetails = await BookService.GetBooksDetails(id);
          setBook(bookDetails);
          setError(null);
        } catch (error) {
          console.error("Failed to fetch book details:", error);
        }
      }
    };
    fetchBookDetails();
  }, [id]);

  if (!book) {
    return (
      <>
        <Navbar searchTerm={""} setSearchTerm={() => {}} />
        <Container style={{ marginTop: "80px", textAlign: "center" }}>
          <p>Loading book details or book not found...</p>
        </Container>
      </>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleDelete = () => {
    // Logjikë për fshirjen nga cart ose reset quantity
    setQuantity(0);
  };

  const handleAddToCart = async () => {
  if (!book) return;

  const model: CartItemModel = {
  // photoUrl: book.photoUrl ?? "",
  bookId: book.id ?? "",       // nëse është null, vendos bosh
  quantity: quantity,
  title: book.title ?? "",     // nëse është null, vendos bosh
  category: book.category?.name ?? "",
  price: book.price ?? 0       // nëse është null, vendos 0    book.id, quantity,
};

  try {
    //await CartService.AddToCart("test-user", model); 
    await CartService.AddToCart(UserService.getUserId(), model);
    const cartData = await CartService.GetCart(userId);
    navigate("/cart"); // pas shtimit, shkon te Cart Page
  } catch (error) {
    console.error("Failed to add to cart:", error);
  }
};
  return (
    <>
      <Navbar searchTerm={""} setSearchTerm={() => {}} />
      <Container style={{ marginTop: "150px" }}>
        <Grid stackable columns={2}>
          <Grid.Column width={6}>
            <Image
              src={`https://localhost:7141${book.photoUrl}`}
              alt={book.title || "Book Cover"}
              fluid
              style={{
                borderRadius: "8px",
                // boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                 boxShadow: "0 4px 6px rgba(17, 16, 16, 0.3)",
                border: "1px solid #ddd",
              }}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as="h1" style={{ fontSize: "2.5em", marginBottom: "0.5em" }}>
              {book.title}
            </Header>

            <div style={{ lineHeight: "1.5em" }}>
              <p>
                <strong>Author(s):</strong> {book.author?.map(a => a.name).join(", ") || "N/A"}
              </p>
              <p>
                <strong>Category:</strong> {book.category?.name || "N/A"}
              </p>
              <p>
                <strong>Published Date:</strong> {formatDate(book.publishedDate)}
              </p>
              <p>
                <strong>Description:</strong> {book.description}
              </p>
            </div>

            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <span style={{ fontSize: "1.8em", fontWeight: "bold", marginRight: "20px" }}>
                ${book.price}
              </span>

              {/* Quantity Control + Trash */}
              <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                <QuantityControl
                  initialQuantity={quantity}
                  maxQuantity={15}
                  // onDelete={handleDelete}
                />
              </div>

              {/* Add to Cart Button */}
              <Button primary onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
}




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { BookModel } from "../Interfaces/BookModel";
// import { BookService } from "../Services/BookService";
// import { CartService } from "../Services/CartService";
// import { Container, Grid, Header, Image, Button } from "semantic-ui-react";
// import Navbar from "./Navbar";
// import QuantityControl from "./QuantityControl";

// export default function BookDetailsPage() {
//   const { id } = useParams<{ id: string }>();
//   const [book, setBook] = useState<BookModel | null>(null);
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       if (id) {
//         try {
//           const bookDetails = await BookService.GetBooksDetails(id);
//           setBook(bookDetails);
//         } catch (error) {
//           console.error("Failed to fetch book details:", error);
//         }
//       }
//     };
//     fetchBookDetails();
//   }, [id]);

//   if (!book) {
//     return (
//       <>
//         <Navbar searchTerm={""} setSearchTerm={() => {}} />
//         <Container style={{ marginTop: "80px", textAlign: "center" }}>
//           <p>Loading book details or book not found...</p>
//         </Container>
//       </>
//     );
//   }

//   const formatDate = (dateString: string | null) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//     });
//   };

//   const handleAddToCart = async () => {
//     if (!book || quantity <= 0) return;

//     try {
//       const cartItem = {
//         bookId: book.id,
//         quantity: quantity,
//         title: book.title,
//         category: book.category?.name || "N/A",
//         price: book.price || 0
//       };

//       const userId = "test-user"; // Replace with your logic to get the logged-in user's ID
//       await CartService.AddToCart(userId, cartItem);
      
//       // Navigate to the cart page
//       navigate('/cart');

//     } catch (error) {
//       console.error("Failed to add book to cart:", error);
//       // You can also display an error message to the user here
//     }
//   };

//   return (
//     <>
//       <Navbar searchTerm={""} setSearchTerm={() => {}} />
//       <Container style={{ marginTop: "150px" }}>
//         <Grid stackable columns={2}>
//           <Grid.Column width={6}>
//             <Image
//               src={`https://localhost:7141${book.photoUrl}`}
//               alt={book.title || "Book Cover"}
//               fluid
//               style={{
//                 borderRadius: "8px",
//                 boxShadow: "0 4px 6px rgba(17, 16, 16, 0.3)",
//                 border: "1px solid #ddd",
//               }}
//             />
//           </Grid.Column>
//           <Grid.Column width={10}>
//             <Header as="h1" style={{ fontSize: "2.5em", marginBottom: "0.5em" }}>
//               {book.title}
//             </Header>

//             <div style={{ lineHeight: "1.5em" }}>
//               <p>
//                 <strong>Author(s):</strong> {book.author?.map(a => a.name).join(", ") || "N/A"}
//               </p>
//               <p>
//                 <strong>Category:</strong> {book.category?.name || "N/A"}
//               </p>
//               <p>
//                 <strong>Published Date:</strong> {formatDate(book.publishedDate)}
//               </p>
//               <p>
//                 <strong>Description:</strong> {book.description}
//               </p>
//             </div>

//             <div style={{ marginTop: "20px", marginBottom: "20px" }}>
//               <span style={{ fontSize: "1.8em", fontWeight: "bold", marginRight: "20px" }}>
//                 ${book.price}
//               </span>

//               {/* Quantity Control */}
//               <div style={{ marginTop: "15px", marginBottom: "15px" }}>
//                 <QuantityControl
//                   initialQuantity={quantity}
//                   maxQuantity={book.stockQty || 15}
//                   onQuantityChange={setQuantity}
//                 />
//               </div>

//               {/* Add to Cart Button */}
//               <Button primary onClick={handleAddToCart}>
//                 Add to Cart
//               </Button>
//             </div>
//           </Grid.Column>
//         </Grid>
//       </Container>
//     </>
//   );
// }
