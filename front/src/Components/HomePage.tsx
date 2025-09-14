// import React, { useEffect, useState } from "react";
// import { BookModel } from "../Interfaces/BookModel";
// import { BookService } from "../Services/BookService";
// import { Container, Grid, Header, Button, Dropdown, Card, Image } from "semantic-ui-react";
// import { useNavigate } from "react-router-dom";

// export default function HomePage() {
//   const [books, setBooks] = useState<BookModel[]>([]);
//   const [genre, setGenre] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBooks = async () => {
//       const response = await BookService.GetAllBooks();
//       setBooks(response);
//     };
//     fetchBooks();
//   }, []);

//   const newReleases = books.slice(-3); // merr 3 librat e fundit
//   const topSellers = books.filter(b => b.stockQty && b.stockQty > 5); // shembull logjike

//   return (
//     <Container style={{ marginTop: "30px" }}>
//       {/* New Releases */}
//       <Header as="h1" textAlign="center">
//         New Releases This Week
//       </Header>
//       <p style={{ textAlign: "center" }}>
//         It&apos;s time to update your reading list with some of the latest and greatest releases.
//       </p>
//       <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         <Button color="yellow">Subscribe</Button>
//       </div>

//       <Grid columns={3} stackable>
//         {newReleases.map(book => (
//           <Grid.Column key={book.id}>
//             <Card onClick={() => navigate(`/book-details/${book.id}`)}>
//               <Image src={`https://localhost:7141${book.photoUrl}`} wrapped ui={false} />
//               <Card.Content>
//                 <Card.Header>{book.title}</Card.Header>
//                 <Card.Meta>{book.publishedDate}</Card.Meta>
//                 <Card.Description>{book.description?.substring(0, 80)}...</Card.Description>
//               </Card.Content>
//               <Card.Content extra>
//                 <strong>${book.price}</strong>
//               </Card.Content>
//             </Card>
//           </Grid.Column>
//         ))}
//       </Grid>

//       {/* Top Sellers */}
//       <Header as="h2" style={{ marginTop: "40px" }}>
//         Top Sellers
//       </Header>
//       <Dropdown
//         placeholder="Choose a genre"
//         selection
//         options={[
//           { key: "all", text: "All", value: "all" },
//           { key: "fiction", text: "Fiction", value: "fiction" },
//           { key: "non-fiction", text: "Non-Fiction", value: "non-fiction" },
//         ]}
//         onChange={(e, { value }) => setGenre(value as string)}
//       />

//       <Grid columns={4} stackable style={{ marginTop: "20px" }}>
//         {topSellers.map(book => (
//           <Grid.Column key={book.id}>
//             <Card>
//               <Image src={`https://localhost:7141${book.photoUrl}`} wrapped ui={false} />
//               <Card.Content>
//                 <Card.Header>{book.title}</Card.Header>
//                 <Card.Description>{book.description?.substring(0, 60)}...</Card.Description>
//               </Card.Content>
//               <Card.Content extra>
//                 <strong>${book.price}</strong>
//               </Card.Content>
//             </Card>
//           </Grid.Column>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

import React, { useEffect, useState } from "react";
import { BookModel } from "../Interfaces/BookModel";
import { BookService } from "../Services/BookService";
import { CategoryService } from "../Services/CategoryService";
import { Container, Grid, Header, Button, Dropdown, Card, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function HomePage() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [categories, setCategories] = useState<{ key: string; text: string; value: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await BookService.GetAllBooks();
      setBooks(response);
    };

//      useEffect(() => {
//     const fetchBooks = async () => {
//       const response = await BookService.GetAllBooks(); // backend endpoint për librat
//       setBooks(response.filter(b => b.isActive)); // filter vetëm librat aktivë ose të aprovuar nga admini
//     };
//     fetchBooks();
//   }, []);

    const fetchCategories = async () => {
      const response = await CategoryService.GetSelectList(); // merr nga API
      const categoryOptions = response.map((c: any) => ({
        key: c.id,
        text: c.name,
        value: c.id,
      }));
      setCategories([{ key: "all", text: "All", value: "all" }, ...categoryOptions]);
    };

    fetchBooks();
    fetchCategories();
  }, []);

  const newReleases = books.slice(-3);

  const filteredBooks =
    selectedCategory && selectedCategory !== "all"
      ? books.filter((b) => b.categoryId === selectedCategory)
      : books;

  return (
    <>
    <Navbar/>
    <Container style={{ marginTop: "80px" }}>
      {/* New Releases */}
      <Header as="h1" textAlign="center">
        New Releases This Week
      </Header>
      <p style={{ textAlign: "center" }}>
        It&apos;s time to update your reading list with some of the latest and greatest releases.
      </p>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Button color="yellow">Subscribe</Button>
      </div>

      <Grid columns={3} stackable>
        {newReleases.map((book) => (
          <Grid.Column key={book.id}>
            <Card onClick={() => navigate(`/book-details/${book.id}`)}>
              <Image src={`https://localhost:7141${book.photoUrl}`} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{book.title}</Card.Header>
                <Card.Meta>{book.publishedDate}</Card.Meta>
                <Card.Description>{book.description?.substring(0, 80)}...</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <strong>${book.price}</strong>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>

      {/* Books By Category */}
      <Header as="h2" style={{ marginTop: "40px" }}>
        Books By Category
      </Header>
      <Dropdown
        placeholder="Choose a category"
        selection
        options={categories}
        onChange={(e, { value }) => setSelectedCategory(value as string)}
      />

      <Grid columns={4} stackable style={{ marginTop: "20px" }}>
        {filteredBooks.map((book) => (
          <Grid.Column key={book.id}>
            <Card>
              <Image src={`https://localhost:7141${book.photoUrl}`} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{book.title}</Card.Header>
                <Card.Description>{book.description?.substring(0, 60)}...</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <strong>${book.price}</strong>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    </Container>
     <Footer/>
     </>
  );
}
