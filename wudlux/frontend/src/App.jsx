// import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home  from "./Pages/Home/Home";
// import ProductList from "./Pages/ProductList/ProductList";
import ContactUs from "./Pages/ContactUs/ContactUs";
import RefundPolicy from "./Pages/RefundPolicy/RefundPolicy";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "./Pages/TermsCondition/TermsCondition";
import Shipping from "./Pages/Shipping/Shipping";
import KitchenWare from "./Pages/kichenWare/KitchenWare";
import OurStory from "./Pages/OurStory/OurStory";
import LoginPage from "./Pages/Login/Login";
import RegistrationForm from "./Pages/Register/Register";
import Productlist from "./Components/ProductList/Productlist";
import ForgotPassword from "./Pages/ForgetPassword/ForgetPassword";
import ProductPage from "./Pages/ProductInfo/ProductInfo";
import Checkout from "./Pages/Checkout/Checkout";
// import Checkout from "./Pages/Checkout/Checkout";
import ProductInfo from "./Pages/ProductInfo/ProductInfo";
import CartPage from "./Pages/Cart/CartPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* navbar  */}
        <Route path = "/Serveware/ServingTray" element = {<KitchenWare />} />
        <Route path = "/ServeWare/withDrawer" element = {<KitchenWare />} />
        <Route path = "/Serveware/BeerCaddy" element = {<KitchenWare />} />
        <Route path = "/Serveware/ServingPlatter" element = {<KitchenWare />} />
        <Route path = "/Serveware/WineServingTray" element = {<KitchenWare />} />
        <Route path = "/KitchenWare/ChoppingBoard" element = {<KitchenWare />} />
        <Route path = "/Kitchenware/ButcherBoard" element = {<KitchenWare />} />
        <Route path = "/TableWare/LazySusan" element = {<KitchenWare />} />
        <Route path = "/TableWare/CoffeePods" element = {<KitchenWare />} />
        <Route path = "/TableWare/CutleryCaddy" element = {<KitchenWare />} />
        <Route path = "/Collections/Bella" element = {<KitchenWare />} />
        <Route path="/products" element={<Productlist />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-condition" element={<TermsCondition />} />
        <Route path="/shipping-policy" element={<Shipping />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegistrationForm />} />
        <Route path="/product-info" element={<ProductPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/product-info" element={<ProductInfo />} />
        
      </Routes>
      <Footer />
    </>
  );
}

export default App;
