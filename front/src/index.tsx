
// // import React from 'react';
// // import ReactDOM from 'react-dom/client';
// // import './index.css';
// // import App from './App';
// // import reportWebVitals from './reportWebVitals';
// // import { BrowserRouter } from "react-router-dom";   // 🔹 importo këtu
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import 'semantic-ui-css/semantic.min.css';

// // const root = ReactDOM.createRoot(
// //   document.getElementById('root') as HTMLElement
// // );
// // root.render(
// //   <React.StrictMode>
// //     <BrowserRouter>   {/* 🔹 vendos Router këtu */}
// //       <App />
// //     </BrowserRouter>
// //   </React.StrictMode>
// // );

// // reportWebVitals();


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import 'semantic-ui-css/semantic.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Provider } from 'react-redux';
// import { store } from './store';
// import { BrowserRouter } from 'react-router-dom'; 

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom'; // ✅ Importo BrowserRouter

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <BrowserRouter> {/* ✅ Vendos Router këtu */}
        <App />
      </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
);

reportWebVitals();

