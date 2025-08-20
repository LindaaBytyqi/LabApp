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
import { PublisherModel } from "../Interfaces/PublisherModel";
import { PublisherService } from "../Services/PublisherService";

export default function PublisherTable() {
  const [publishers, setPublishers] = useState<PublisherModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deletePublisherId, setDeletePublisherId] = useState<string>("");
  
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await PublisherService.GetAllPublishers();
      setPublishers(result);
    }
    fetchData();
  }, []);

  function deletePublishers(id: string) {
    setOpenConfirm(true);
    setDeletePublisherId(id);
  }

  async function confirmedDeletePublisher(id: string) {
    var result = await PublisherService.DeletePublisher(id);
    setPublishers(publishers.filter((publisher) => publisher.id !== id));
    setOpenConfirm(false);
    setDeletePublisherId("");
  }

  function sendToDetails(id:string | null) {
    navigate(`/EditPublisher/${id}`);
  }

  function AddPublisher() {
    navigate(`/AddPublisher`);
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>Publisher</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddPublisher()}
        >
          Add New Publisher
        </Button>
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
      </div>
      </div>
      <Table striped>
        <TableHeader>
          <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {publishers.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
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
                  onClick={() => deletePublishers(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeletePublisher(deletePublisherId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
