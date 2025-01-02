<<<<<<< HEAD
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './Context/StoreContextProvider.jsx'; 
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './Context/CartContext.jsx'
// import { BrowserRouter } from 'react-router-dom'
>>>>>>> ff659f503f46f278b8f8021aa5bd1d04345658fa

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
=======
      <CartProvider>
      <App />
      </CartProvider>
>>>>>>> ff659f503f46f278b8f8021aa5bd1d04345658fa
    </BrowserRouter>
  </StrictMode>
);
