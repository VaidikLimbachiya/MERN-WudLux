// import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import Home from "./Pages/Home/Home";
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
import CartPage from "./Pages/Cart/CartPage";
import Order from "./Pages/Order/Order";
import Address from "./Pages/Address/Address";
import Sidebar from "./Components/Sidebar/Sidebar";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import OrderDetails from "./Pages/OrderDetails/OrderDetails";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const SidebarLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div style={{ display: isMobile ? "block" : "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
};

function App() {
  return (
    <>
      <ScrollToTop /> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Navbar Links */}
        <Route path="/products" element={<KitchenWare />} />
        {/* <Route path="/ServeWare/withDrawer" element={<KitchenWare />} />
        <Route path="/Serveware/BeerCaddy" element={<KitchenWare />} />
        <Route path="/Serveware/ServingPlatter" element={<KitchenWare />} />
        <Route path="/Serveware/WineServingTray" element={<KitchenWare />} />
        <Route path="/KitchenWare/ChoppingBoard" element={<KitchenWare />} />
        <Route path="/Kitchenware/ButcherBoard" element={<KitchenWare />} />
        <Route path="/TableWare/LazySusan" element={<KitchenWare />} />
        <Route path="/TableWare/CoffeePods" element={<KitchenWare />} />
        <Route path="/TableWare/CutleryCaddy" element={<KitchenWare />} />
        <Route path="/Collections/Bella" element={<KitchenWare />} /> */}
        <Route path="/products" element={<Productlist />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-condition" element={<TermsCondition />} />
        <Route path="/shipping-policy" element={<Shipping />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegistrationForm />} />
        <Route path="/product-info/:id" element={<ProductPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/CartPage" element={<CartPage />} />
        {/* Routes with Sidebar */}
        <Route
          path="/orders"
          element={
            <SidebarLayout>
              <Order />
            </SidebarLayout>
          }
        />
        <Route
          path="/address"
          element={
            <SidebarLayout>
              <Address />
            </SidebarLayout>
          }
        />
        <Route
          path="/order-details/:orderId"
          element={
            <SidebarLayout>
              <OrderDetails />
            </SidebarLayout>
          }
        />

        {/* Logout */}
        <Route path="/logout" element={<LoginPage />} />
      </Routes>
      <Footer />

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
