
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminRoute from "./Components/AdminRoutes";
import LayoutWithSideBar from "./Components/LayoutWithSidebar";
import EmptyLayout from "./Components/EmptyLayout";
import Login from "./Components/Login";
import CategoryTable from "./Components/CategoryTable";
import EditCategory from "./Components/EditCategory";
import BookTable from "./Components/BookTable";
import EditBook from "./Components/EditBook";
import AuthorTable from "./Components/AuthorTable";
import EditAuthor from "./Components/EditAuthor";
import PublisherTable from "./Components/PublisherTable";
import EditPublisher from "./Components/EditPublisher";
import CartTable from "./Components/CartTable";
import EditCartItem from "./Components/EditCart";
import OrderTable from "./Components/OrderTable";
import OrderDetails from "./Components/OrderDetails";
import HomePage from "./Components/HomePage";
import AdminDashboard from "./Components/AdminDashboard";
import BookDetails from "./Components/BookDetails";
import BookAddedConfirmation from "./Components/BookAddedConfirmation"; 
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";

function App() {
  return (
    <Routes>
      {/* Login pa sidebar */}
      <Route path="/login" element={<Login />} />
         <Route path="/" element={<HomePage />} />
         <Route path="/aboutus" element={<AboutUs />} />
         <Route path="/contact" element={<ContactUs />} />
      {/* <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/book-added/:id" element={<BookAddedConfirmation />} /> */}

      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/book-added/:id" element={<BookAddedConfirmation />} />

       <Route element={<LayoutWithSideBar />}>
        <Route path="/AdminDashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
         </Route>
      
      {/* CRUD dhe rrugë tjera pa sidebar */}
      <Route element={<EmptyLayout />}>
        <Route path="/Category" element={<AdminRoute><CategoryTable /></AdminRoute>} />
        <Route path="/AddCategory" element={<AdminRoute><EditCategory /></AdminRoute>} />
        <Route path="/EditCategory/:id" element={<AdminRoute><EditCategory /></AdminRoute>} />

        <Route path="/Book" element={<AdminRoute><BookTable /></AdminRoute>} />
        <Route path="/AddBook" element={<AdminRoute><EditBook /></AdminRoute>} />
        <Route path="/EditBook/:id" element={<AdminRoute><EditBook /></AdminRoute>} />

        <Route path="/Author" element={<AdminRoute><AuthorTable /></AdminRoute>} />
        <Route path="/AddAuthor" element={<AdminRoute><EditAuthor /></AdminRoute>} />
        <Route path="/EditAuthor/:id" element={<AdminRoute><EditAuthor /></AdminRoute>} />

        <Route path="/Publisher" element={<AdminRoute><PublisherTable /></AdminRoute>} />
        <Route path="/AddPublisher" element={<AdminRoute><EditPublisher /></AdminRoute>} />
        <Route path="/EditPublisher/:id" element={<AdminRoute><EditPublisher /></AdminRoute>} />

        {/* <Route path="/Cart" element={<AdminRoute><CartTable /></AdminRoute>} /> */}
        <Route path="/Cart" element={<CartTable />} />
        <Route path="/AddCart" element={<AdminRoute><EditCartItem /></AdminRoute>} />
        <Route path="/EditCart/:id" element={<AdminRoute><EditCartItem /></AdminRoute>} />

        <Route path="/checkout" element={<AdminRoute><OrderTable /></AdminRoute>} />
        <Route path="/order/:id" element={<AdminRoute><OrderDetails /></AdminRoute>} />
       
      </Route>
    </Routes>
  );
}

export default App;
