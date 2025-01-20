import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './Context/CartContext'; // Correct import
import { UserProvider } from './Context/UserContext'; // Import the UserProvider
// import { FilterProvider } from './Context/FilterContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          {/* <FilterProvider> */}
          <App />
          {/* </FilterProvider> */}
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
