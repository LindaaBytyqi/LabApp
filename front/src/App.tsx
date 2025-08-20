import React from 'react';
//simport { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryTable from './Components/CategoryTable';
import EditCategory from './Components/EditCategory';
import AuthorTable from './Components/AuthorTable';
import EditAuthor from './Components/EditAuthor';
import AdminRoute from './Components/AdminRoutes';
import BookTable from './Components/BookTable';
import EditBook from './Components/EditBook';
import PublisherTable from './Components/PublisherTable';
import EditPublisher from './Components/EditPublisher';
import 'semantic-ui-css/semantic.min.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path="/Category" element={ <AdminRoute> <CategoryTable /> </AdminRoute> } />
         <Route path="/AddCategory/" element={ <AdminRoute>   <EditCategory /> </AdminRoute> } />
        <Route path="/EditCategory/:id" element={ <AdminRoute>   <EditCategory /> </AdminRoute> } />

        <Route path="/Book" element={ <AdminRoute>   <BookTable /> </AdminRoute>} />
         <Route path="/AddBook/" element={ <AdminRoute>   <EditBook /> </AdminRoute> } />
        <Route path="/EditBook/:id" element={ <AdminRoute><EditBook /> </AdminRoute>} />

        <Route path="/Author" element={ <AdminRoute>   <AuthorTable /> </AdminRoute>} />
         <Route path="/AddAuthor/" element={ <AdminRoute>   <EditAuthor /> </AdminRoute> } />
        <Route path="/EditAuthor/:id" element={ <AdminRoute><EditAuthor /> </AdminRoute>} /> 

         <Route path="/Publisher" element={ <AdminRoute> <PublisherTable /> </AdminRoute> } />
         <Route path="/AddPublisher/" element={ <AdminRoute>   <EditPublisher /> </AdminRoute> } />
        <Route path="/EditPublisher/:id" element={ <AdminRoute>   <EditPublisher /> </AdminRoute> } />


      </Routes>
  );
}

export default App;
