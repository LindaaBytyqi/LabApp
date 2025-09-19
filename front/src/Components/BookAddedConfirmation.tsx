import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookModel } from "../Interfaces/BookModel";
import { Button, Card, Image, Header, Icon } from "semantic-ui-react";

export default function BookAddedConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const book: BookModel | undefined = location.state?.book;

  if (!book) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
      <Header as="h2" icon textAlign="center" color="green">
        <Icon name="check circle outline" />
        Book confirmed!
      </Header>

      <Card fluid style={{ maxWidth: "500px", marginTop: "20px" }}>
        {book.photoUrl && <Image src={`https://localhost:7141${book.photoUrl}`} alt={book.title} wrapped ui={false} />}
        <Card.Content>
          <Card.Header>{book.title}</Card.Header>
          <Card.Meta>
            <p><b>Author(s):</b> {book.authorNames?.join(", ") || "Unknown"}</p>
            <p><b>Category:</b> {book.categoryId || "Unknown"}</p>
            <p><b>Price:</b> {book.price ?? 0} €</p>
          </Card.Meta>
          <Card.Description>{book.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button color="blue" onClick={() => navigate("/home")}>
            Back to Home
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
}




// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { BookModel } from "../Interfaces/BookModel";
// import { Button, Card, Image, Header, Icon } from "semantic-ui-react";

// export default function BookAddedConfirmation() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Merr librin nga state
//   const book: BookModel | undefined = location.state?.book;

//   // Nëse nuk ka book, shfaq Loading
//   if (!book) return <p>Loading...</p>;

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
//       <Header as="h2" icon textAlign="center" color="green">
//         <Icon name="check circle outline" />
//         Book added successfully!
//       </Header>

//       <Card fluid style={{ maxWidth: "500px", marginTop: "20px" }}>
//         {book.photoUrl && (
//           <Image
//             src={`https://localhost:7141${book.photoUrl}`}
//             alt={book.title || "Book cover"}
//             wrapped
//             ui={false}
//           />
//         )}
//         <Card.Content>
//           <Card.Header>{book.title}</Card.Header>
//           <Card.Meta>
//             <p><b>Author(s):</b> {book.authorNames?.join(", ") || "Unknown"}</p>
//             <p><b>Category:</b> {book.categoryId || "Unknown"}</p>
//             <p><b>Price:</b> {book.price ?? 0} €</p>
//           </Card.Meta>
//           <Card.Description>{book.description}</Card.Description>
//         </Card.Content>
//         <Card.Content extra>
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <Button color="blue" onClick={() => navigate("/home")}>
//               Continue Shopping
//             </Button>
//           </div>
//         </Card.Content>
//       </Card>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { BookService } from "../Services/BookService";
// import { BookModel } from "../Interfaces/BookModel";
// import { Button, Card, Image, Header, Icon } from "semantic-ui-react";

// export default function BookAddedConfirmation() {
//   const { id } = useParams<{ id: string }>();
//   const [book, setBook] = useState<BookModel | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//      console.log("BookAddedConfirmation id from params:", id);

//       if (id) {
//     BookService.GetBooksDetails(id).then((b) => {
//       console.log("Fetched book:", b); // ✅ tregon librin e marrë nga API
//       setBook(b);
//     });
//   }
// }, [id]);

//   //   if (id) {
//   //     BookService.GetBooksDetails(id).then(setBook);
//   //      console.log("Fetched book:", b);
//   //   }
//   // }, [id]);

//   if (!book) return <p>Loading...</p>;

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
//       <Header as="h2" icon textAlign="center" color="green">
//         <Icon name="check circle outline" />
//         Book added successfully!
//       </Header>

//       <Card fluid style={{ maxWidth: "500px", marginTop: "20px" }}>
//         {book.photoUrl && (
//           <Image
//             src={`https://localhost:7141${book.photoUrl}`}
//             alt={book.title || "Book cover"}
//             wrapped
//             ui={false}
//           />
//         )}
//         <Card.Content>
//           <Card.Header>{book.title}</Card.Header>
//           <Card.Meta>
//             <p><b>Author:</b> {book.authorNames?.join(", ") || "Unknown"}</p>
//             <p><b>Category:</b> {book.categoryId || "Unknown"}</p>
//             <p><b>Publisher:</b> {book.publisherId || "Unknown"}</p>
//             <p><b>Price:</b> {book.price ?? 0} €</p>
//           </Card.Meta>
//           <Card.Description>{book.description}</Card.Description>
//         </Card.Content>
//         <Card.Content extra>
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <Button color="yellow" onClick={() => navigate("/cart")}>
//               Go to Cart
//             </Button>
//             <Button color="blue" onClick={() => navigate("/home")}>
//               Continue Shopping
//             </Button>
//           </div>
//         </Card.Content>
//       </Card>
//     </div>
//   );
// }
