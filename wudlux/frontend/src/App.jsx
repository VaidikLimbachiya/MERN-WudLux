// import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { Home } from "./Pages/Homepage/Home";
import ProductList from "./Pages/ProductList/ProductList";
import ContactUs from "./Pages/ContactUs/ContactUs";
<<<<<<< HEAD
import RefundPolicy from "./Pages/RefundPolicy/RefundPolicy";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "./Pages/TermsCondition/TermsCondition";
import Shipping from "./Pages/Shipping/Shipping";
=======
import KitchenWare from "./Pages/kichenWare/KitchenWare";
>>>>>>> eddc1751160711d12bc9156db32b0729528fbda7

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
