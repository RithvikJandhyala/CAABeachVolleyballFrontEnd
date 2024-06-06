import React from 'react';
import ReactDOM from 'react-dom';
import RegisterRoutePaths from './RegisterRoutePaths';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

 
ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
 <RegisterRoutePaths></RegisterRoutePaths>
     </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);
