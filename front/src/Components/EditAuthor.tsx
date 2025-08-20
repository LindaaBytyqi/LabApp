import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { AuthorModel } from '../Interfaces/AuthorModel';
import { AuthorService } from '../Services/AuthorService';
import 'semantic-ui-css/semantic.min.css';
export default function EditAuthor() {
  const { id } = useParams<{ id: string}>();
  const [values, setValues] = useState<AuthorModel>({
    id:id!,
    name: '',
    bio:'',
    dateOfBirth:'',
    country:''
  } as AuthorModel);

  const navigate = useNavigate();
  const [author, setauthor] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if(id!=null){
     const response = await AuthorService.GetAuthorsDetails(id!);
     const userData = response;
     setValues({
       id: userData.id,
       name: userData.name,
       bio:userData.bio,
       dateOfBirth:userData.dateOfBirth,
       country:userData.country
     }as AuthorModel);
    }
  };
  
  fetchData();
}, [id!]);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    let model = {
      id: values.id!,
      name: values.name,
      bio:values.bio,
      dateOfBirth:values.dateOfBirth,
      country:values.country
    } as AuthorModel;

    const response = await axios.post(
      "https://localhost:7141/api/Author",
      model
    );
    setauthor(true);
    sendToOverview();
  } catch (error) {
    console.error("Error creating state:", error);
  }
};
function sendToOverview(){
  navigate('/author');
 }
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = e.target;
  setValues({ ...values, [name]: value });
};
  return (
    <>  
    <h1 style={{ marginLeft: "15px", fontFamily: "Georgia", color: "black" }}>
        {values.id != null ? 'Edit' : 'Add'} Author
      </h1>
      <p style={{ marginLeft: "15px", color: "#555", fontSize: "14px" }}>
        Please fill out the form below to {values.id != null ? 'edit' : 'create'} a Author.
      </p>
      <Segment clearing style={{ margin: "30px 30px 0 10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgb(15 179 126 / 87%)" }}>
    <form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
        <label>FullName</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder=" FullName"
            className="form-control"
            id="name"
            name="name"
            value={values.name!}
            onChange={handleChange}
          />
        </div>
         <div className="form-group">
        <label>BIO</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder="Bio"
            className="form-control"
            id="bio"
            name="bio"
            value={values.bio!}
            onChange={handleChange}
          />
        </div>
         <div className="form-group">
        <label>DateOfBirth</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="date"
            placeholder="DateOfBirth"
            className="form-control"
            id="dateOfBirth"
            name="dateOfBirth"
            value={values.dateOfBirth!}
            onChange={handleChange}
          />
        </div>
         <div className="form-group">
        <label>Country</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder="Country"
            className="form-control"
            id="country"
            name="country"
            value={values.country!}
            onChange={handleChange}
          />
        </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button
          type="submit"
           onClick={sendToOverview}
           className="ui blue basic button"
          style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }}
          >
          Cancel
        </button>
        <button
          type="submit"
          className="ui green button"
          style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }}
        >
          Submit
        </button>
        </div>
      </form>
      </Segment>
      <br/>
      <br/>
    </>
  );
}
