import { useState } from 'react'
import './App.css'
import Footer from './Components/Footer/Footer'
import Services from './Components/Services/service'
import Navbar from './Components/Navbar/Navbar'
import Header from './Components/Header/Header'
import Slider from './Components/Header/Header'
import Categories from './Components/categories/categories'
import Offers from './Components/offers/offers'
import Products from './Components/Products/products'
// import HotProducts from './Components/HotProducts/Hotproducts'

function App() {
 

  return (
    <>
      <Navbar />
      <Header />
      <Categories />
      <Offers />
      <Products />
      <Services />
      {/* <HotProducts /> */}
      <Footer />
    </>
  )
}

export default App
