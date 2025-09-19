

import React, { useEffect, useState } from "react";
import { BookModel } from "../Interfaces/BookModel";
import { BookService } from "../Services/BookService";
import { CategoryService } from "../Services/CategoryService";
import { Container, Grid, Header, Button, Dropdown, Card, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthorModel } from "../Interfaces/AuthorModel";
import "./BookCard.css";

export default function HomePage() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [categories, setCategories] = useState<{ key: string; text: string; value: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
  const fetchBooks = async () => {
    const response = await BookService.GetAllBooks();
    setBooks(response);
  };
  fetchBooks();
}, []);

//     useEffect(() => {
//   const fetchBooks = async () => {
//     if (!searchTerm) return;
//     const result = await BookService.SearchBooks(searchTerm);
//     setBooks(result);
//   };

//   const delay = setTimeout(() => fetchBooks(), 500);
//   return () => clearTimeout(delay);
// }, [searchTerm]);

   const filteredBooks = books
  .filter((b) => selectedCategory && selectedCategory !== "all" ? b.categoryId === selectedCategory : true)
  .filter((b) => (b.title?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()));



    useEffect(() => {
  const fetchCategories = async () => {
    const response = await CategoryService.GetSelectList();
    const categoryOptions = response.map((c: any) => ({
      key: c.id,
      text: c.name,
      value: c.id,
    }));
    setCategories([{ key: "all", text: "All", value: "all" }, ...categoryOptions]);
  };
  fetchCategories();
}, []);



  const newReleases = [...books]
  .sort((a, b) => new Date(b.publishedDate || "").getTime() - new Date(a.publishedDate || "").getTime())
  .slice(0, 3);

  // const filteredBooks =
  //   selectedCategory && selectedCategory !== "all"
  //     ? books.filter((b) => b.categoryId === selectedCategory)
  //     : books;

  return (
    <>
    <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    <Container style={{ marginTop: "80px" }}>
      {/* New Releases */}
     {/* New Releases */}
<Header as="h1" textAlign="center">
  New Releases This Week
</Header>
<p style={{ textAlign: "center" }}>
  It&apos;s time to update your reading list with some of the latest releases.
</p>

<div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "20px 0" }}>
  {newReleases.map((book) => (
    <div key={book.id} style={{ width: "200px", height: "300px", overflow: "hidden" }}>
      <img
        src={`https://localhost:7141${book.photoUrl}`}
        alt={book.title || ""}
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
      />
    </div>
  ))}
</div>


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


<div style={{ maxWidth: "1200px", margin: "0 auto" }}>
<Grid columns={3} stackable style={{ marginTop: "20px" }}>
 
  {filteredBooks.map((book) => (
    <Grid.Column key={book.id}>
      <div className="book-card">
        {/* Foto */}
        <div style={{ textAlign: "center" }}>
          <img
            src={`https://localhost:7141${book.photoUrl}`}
            alt={book.title || ""}
          />
        </div>

        {/* Titulli & Përshkrimi */}
        <div>
          <h3>{book.title}</h3>
          <p>{book.description?.substring(0, 80)}...</p>
        </div>

        {/* Çmimi & Butoni */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px" }}>
          <div>
            <span className="book-price">${book.price}</span>
            <span className="book-oldprice">${book.price}</span>
          </div>
          <button onClick={() => navigate(`/cart/${book.id}`)}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </Grid.Column>
  ))}
</Grid>
</div>



     
    </Container>
     <Footer/>
     </>
  
  );
}
