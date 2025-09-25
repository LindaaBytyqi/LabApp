import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  Button,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Confirm,
  Image,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { BookModel } from "../Interfaces/BookModel";
import { BookService } from "../Services/BookService";
import { SelectListItem } from "../Interfaces/SelectListItem";
import 'semantic-ui-css/semantic.min.css';

export default function BookTable() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteBookId, setDeleteBookId] = useState<string>("");
  const [authorList, setAuthorList] = useState<SelectListItem[]>([]);
  const [categoryList, setCategoryList] = useState<SelectListItem[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await BookService.GetAllBooks();
      setBooks(result);
    };
    fetchData();
  }, []);

  function deleteBooks(id: string) {
    setOpenConfirm(true);
    setDeleteBookId(id);
  }

  async function confirmedDeleteBook(id: string) {
    await BookService.DeleteBook(id);
    setBooks(books.filter((book) => book.id !== id));
    setOpenConfirm(false);
    setDeleteBookId("");
  }

  function sendToDetails(id: string | null) {
    navigate(`/EditBook/${id}`);
  }

  function AddBook() {
    navigate(`/AddBook`);
  }

  return (
    <Fragment>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "30px" }}>
        <h1>BOOK</h1>
        <Button
          type="button"
          className="ui positive basic button"
          onClick={AddBook}
        >
          Add New Book
        </Button>
      </div>

      <Table celled striped>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Photo</TableHeaderCell>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>ISBN</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Stock</TableHeaderCell>
            <TableHeaderCell>PublishedDate</TableHeaderCell>
             <TableHeaderCell>PublisherName</TableHeaderCell>
            <TableHeaderCell>AuthorFullName</TableHeaderCell>
            <TableHeaderCell>CategoryName</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {books.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Image
                  src={item.photoUrl  ? `https://localhost:7141${item.photoUrl}`
                 : "https://via.placeholder.com/50"
          }
                    //|| "https://via.placeholder.com/50"}
                  size="tiny"
                  circular
                />
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.isbn}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableHeaderCell>{item.stockQty}</TableHeaderCell>
              <TableCell>{item.publishedDate}</TableCell>
              <TableCell>{item.publisherId}</TableCell>
             <TableCell>{item.authorIds}</TableCell>
              <TableCell>{item.categoryId}</TableCell>
              <TableCell>
                <Button
                  type="button"
                  className="ui green basic button"
                  onClick={() => sendToDetails(item.id!)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  negative
                  onClick={() => deleteBooks(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Confirm
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() => confirmedDeleteBook(deleteBookId!)}
      />
    </Fragment>
  );
}
