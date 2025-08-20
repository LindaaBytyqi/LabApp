import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Confirm,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { Link, useNavigate } from "react-router-dom";
import { AuthorModel } from "../Interfaces/AuthorModel";
import { AuthorService } from "../Services/AuthorService";

export default function AuthorTable() {
  const [authors, setAuthors] = useState<AuthorModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteAuthorId, setDeleteAuthorId] = useState<string>("");
  
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await AuthorService.GetAllAuthors();
      setAuthors(result);
    }
    fetchData();
  }, []);

  function deleteAuthors(id: string) {
    setOpenConfirm(true);
    setDeleteAuthorId(id);
  }

  async function confirmedDeleteAuthor(id: string) {
    var result = await AuthorService.DeleteAuthor(id);
    setAuthors(authors.filter((author) => author.id !== id));
    setOpenConfirm(false);
    setDeleteAuthorId("");
  }

  function sendToDetails(id:string | null) {
    navigate(`/EditAuthor/${id}`);
  }

  function AddAuthor() {
    navigate(`/AddAuthor`);
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>Author</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddAuthor()}
        >
          Add New Author
        </Button>
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
      </div>
      </div>
      <Table striped>
        <TableHeader>
          <TableRow>
          <TableHeaderCell>FullName</TableHeaderCell>
          <TableHeaderCell>Bio</TableHeaderCell>
          <TableHeaderCell>DateOfBirth</TableHeaderCell>
          <TableHeaderCell>Country</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {authors.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.bio}</TableCell>
              <TableCell>{item.dateOfBirth}</TableCell>
              <TableCell>{item.country}</TableCell>
              <TableCell>
                <Button
                  type="button"
                  className="btn ui green basic button"
                  onClick={() => sendToDetails(item.id!)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  className="btn btn-danger"
                  negative
                  onClick={() => deleteAuthors(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteAuthor(deleteAuthorId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
