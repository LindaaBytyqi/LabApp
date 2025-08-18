import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryTable from './Components/EditCategory';
import EditCategory from './Components/EditCategory';

import AdminRoute from './Components/AdminRoutes';
import 'semantic-ui-css/semantic.min.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Category" element={ <AdminRoute> <CategoryTable /> </AdminRoute> } />
         <Route path="/AddCategory/" element={ <AdminRoute>   <EditCategory /> </AdminRoute> } />
        <Route path="/EditCategory/:id" element={ <AdminRoute>   <EditCategory /> </AdminRoute> } />
        {/* <Route path="/Book" element={ <AdminRoute>   <BookTable /> </AdminRoute>} />
         <Route path="/AddBook/" element={ <AdminRoute>   <EditBook /> </AdminRoute> } />
        <Route path="/EditBook/:id" element={ <AdminRoute><EditBook /> </AdminRoute>} />
        <Route path="/Author" element={ <AdminRoute>   <AuthorTable /> </AdminRoute>} />
         <Route path="/AddAuthor/" element={ <AdminRoute>   <EditAuthor /> </AdminRoute> } />
        <Route path="/EditAuthor/:id" element={ <AdminRoute><EditAuthor /> </AdminRoute>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
