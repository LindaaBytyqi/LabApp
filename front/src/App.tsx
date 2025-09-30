
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
import EditCartItem from "./Components/EditCart";
import OrderTable from "./Components/OrderTable";
import HomePage from "./Components/HomePage";
import AdminDashboard from "./Components/AdminDashboard";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import QuantityControl from "./Components/QuantityControl";
import BookDetailsPage from "./Components/BookDetailsPage";
import CartPage from "./Components/CartPage";
import Register from "./Components/Register";
import OrderSuccess from "./Components/OrderSuccess";
import CoordinatorDashboard from "./Components/CoordinatorDashboard";
import OrderEdit from "./Components/OrderEdit";

function App() {
  return (
    <Routes>
      {/* Login pa sidebar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/quantity" element={<QuantityControl />} />
        <Route path="/book/:id" element={<BookDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<OrderTable />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
       

       <Route element={<LayoutWithSideBar />}>
       <Route path="/AdminDashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
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
       
{/* 
         <Route path="/OrderEdit/:id" element={<AdminRoute><OrderEdit /></AdminRoute>} />  */}
         <Route path="/OrderEdit/:id" element={<AdminRoute><OrderEdit /></AdminRoute>} /> 
        <Route path="/CoordinatorDashboard" element={<AdminRoute><CoordinatorDashboard /></AdminRoute>} />


        {/* <Route path="/OrderEdit/:id" element={<OrderEdit />} />
        <Route path="/CoordinatorDashboard" element={<CoordinatorDashboard />} /> */}
         
       </Route>
      
      {/* CRUD dhe rrugë tjera pa sidebar */}
      <Route element={<EmptyLayout />}>

       
      </Route>
    </Routes>
  );
}

export default App;
