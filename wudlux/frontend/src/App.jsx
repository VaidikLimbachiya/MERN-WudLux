import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
<<<<<<< HEAD
import KitchenWare from "./Pages/kichenWare/KitchenWare";
import OurStory from "./Pages/OurStory/OurStory";

=======
import Home from "./Pages/Home/Home";
import ProductList from "./Pages/ProductList/ProductList";
import OurStory from "./Pages/OurStory/OurStory";
import ContactUs from "./Pages/ContactUs/ContactUs";
>>>>>>> 6c075782fce7da474681301173af45e71fc8a31d

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/kitchenWare/ChoppingBoard" element={<KitchenWare />} />
        <Route path="/our-story" element={<OurStory/>} />
=======
        <Route path="/products" element={<ProductList />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/contact-us" element={<ContactUs />} />
>>>>>>> 6c075782fce7da474681301173af45e71fc8a31d
      </Routes>
      <Footer />
    </>
  );
}

export default App;
