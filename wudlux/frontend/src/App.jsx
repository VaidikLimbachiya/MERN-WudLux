// import { useState } from 'react'
import {  Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Homepage/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import KitchenWare from "./Pages/kichenWare/KitchenWare";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kitchenWare/ChoppingBoard" element={<KitchenWare />} />
      </Routes>
      <Footer />
      </>
  );
}

export default App;