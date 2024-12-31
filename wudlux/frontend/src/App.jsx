// import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { Home } from "./Pages/Homepage/Home";
import ProductList from "./Pages/ProductList/ProductList";
import OurStory from "./Pages/OurStory/OurStory";
import ContactUs from "./Pages/ContactUs/ContactUs";
import KitchenWare from "./Pages/kichenWare/KitchenWare";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/Kitchenware/ChoppingBoard" element = {<KitchenWare />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
