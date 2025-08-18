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
import { CategoryModel } from "../Interfaces/CategoryModel";
import { CategoryService } from "../Services/CategoryService";

export default function CategoryTable() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string>("");
  
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await CategoryService.GetAllCategories();
      setCategories(result);
    }
    fetchData();
  }, []);

  function deleteCategories(id: string) {
    setOpenConfirm(true);
    setDeleteCategoryId(id);
  }

  async function confirmedDeleteCategory(id: string) {
    var result = await CategoryService.DeleteCategory(id);
    setCategories(categories.filter((group) => group.id !== id));
    setOpenConfirm(false);
    setDeleteCategoryId("");
  }

  function sendToDetails(id:string | null) {
    navigate(`/EditCategory/${id}`);
  }

  function AddCategory() {
    navigate(`/AddCategory`);
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>Category</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddCategory()}
        >
          Add New Category
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
          {categories.map((item) => (
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
                  onClick={() => deleteCategories(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteCategory(deleteCategoryId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
