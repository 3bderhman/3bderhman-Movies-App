import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'jquery/dist/jquery';
import MoviesContextProvider from "./Components/Context/MoviesContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MoviesContextProvider>
        <App />
      </MoviesContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);