// import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
<<<<<<< HEAD
import  Home  from "./Pages/Home/Home";
import ProductList from "./Pages/ProductList/ProductList";
import ContactUs from "./Pages/ContactUs/ContactUs";
import KitchenWare from "./Pages/kichenWare/KitchenWare";
=======
import Home  from "./Pages/Home/Home";
import ProductList from "./Pages/ProductList/ProductList";
import ContactUs from "./Pages/ContactUs/ContactUs";
>>>>>>> 1d19d6070942787a985c2f23c14c062a2eb419dc
import RefundPolicy from "./Pages/RefundPolicy/RefundPolicy";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "./Pages/TermsCondition/TermsCondition";
import Shipping from "./Pages/Shipping/Shipping";
<<<<<<< HEAD
=======
import KitchenWare from "./Pages/kichenWare/KitchenWare";
>>>>>>> 1d19d6070942787a985c2f23c14c062a2eb419dc

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/Kitchenware/ChoppingBoard" element = {<KitchenWare />} />
        <Route path="/products" element={<ProductList />} />
        {/* <Route path="/our-story" element={<OurStory />} /> */}
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-condition" element={<TermsCondition />} />
        <Route path="/shipping-policy" element={<Shipping />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
