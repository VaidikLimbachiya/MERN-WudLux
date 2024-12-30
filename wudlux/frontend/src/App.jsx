import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import ProductList from "./Pages/ProductList/ProductList";
import OurStory from "./Pages/OurStory/OurStory";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/our-story" element={<OurStory />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
