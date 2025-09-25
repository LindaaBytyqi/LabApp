import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookModel } from "../Interfaces/BookModel";
import { BookService } from "../Services/BookService";
import { Container, Grid, Header, Image, Button } from "semantic-ui-react";
import Navbar from "./Navbar";
import QuantityControl from "./QuantityControl";

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookModel | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        try {
          const bookDetails = await BookService.GetBooksDetails(id);
          setBook(bookDetails);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return (
    <>
      <Navbar searchTerm={""} setSearchTerm={() => {}} />
      <Container style={{ marginTop: "80px", textAlign: "center" }}>
        <p>Loading book details...</p>
      </Container>
    </>
  );

  const handleAddToCart = () => {
    // Merr ose krijo guestId
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = "guest-" + Math.random().toString(36).substring(2, 10);
      localStorage.setItem("guestId", guestId);
    }

    const existingCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
    const existingItem = existingCart.find((item: any) => item.bookId === book.id);

    const fullPhotoUrl = book.photoUrl
    ? (book.photoUrl.startsWith("http")
        ? book.photoUrl
        : `https://localhost:7141${book.photoUrl}`)
    : "";

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      existingCart.push({
        bookId: book.id,
        title: book.title || "No Title",
       authors: book.authorNames?.length ? book.authorNames.join(", ") : "Unknown",
        // category: book.category?.name || "Uncategorized",
        price: book.price ?? 0,
        photoUrl: fullPhotoUrl || "",
        quantity
      });
    }

    localStorage.setItem("guestCart", JSON.stringify(existingCart));

    // Event për CartPage që rifreskohet
    window.dispatchEvent(new Event("guestCartUpdated"));

    // Shko te CartPage
    navigate("/cart");
  };

  return (
    <>
      <Navbar searchTerm={""} setSearchTerm={() => {}} />
      <Container style={{ marginTop: "150px" }}>
        <Grid stackable columns={2}>
  <Grid.Column width={6}>
    <div
  style={{
    width: "100%",
    height: "400px",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  }}
>
  <Image
    src={book.photoUrl
      ? book.photoUrl.startsWith("http")
        ? book.photoUrl
        : `https://localhost:7141${book.photoUrl.startsWith("/") ? book.photoUrl : "/uploads/" + book.photoUrl}`
      : "https://via.placeholder.com/700x400?text=No+Image"
    }
    alt={book.title || "Book Cover"}
    style={{
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
    }}
  />
</div>
  </Grid.Column>

  <Grid.Column width={10}>
    <Header as="h1">{book.title}</Header>
    <p><strong>Description:</strong> {book.description || "No description available."}</p>
    <p><strong>Author(s):</strong> {book.authorNames?.length ? book.authorNames.join(", ") : "N/A"}</p>
    <p><strong>Category:</strong> {book.categoryName || "N/A"}</p>
    <p><strong>Publisher:</strong> {book.publisherName || "N/A"}</p>
    <p><strong>Price:</strong> ${book.price}</p>

    <div style={{ marginTop: "15px", marginBottom: "15px" }}>
      <QuantityControl
        initialQuantity={quantity}
        maxQuantity={15}
        onChange={(val) => setQuantity(val)}
      />
    </div>

    <Button primary onClick={handleAddToCart}>Add to Cart</Button>
  </Grid.Column>
</Grid>
 
</Container> 
</> );
 }



