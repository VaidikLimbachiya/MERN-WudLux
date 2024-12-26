// import { useState } from 'react'
import './App.css'
import Footer from './Components/Footer/Footer'
import Services from './Components/Services/service'
import Navbar from './Components/Navbar/Navbar'
import Header from './Components/Header/Header'
import Categories from './Components/categories/categories'
import Offers from './Components/offers/offers'
import Products from './Components/Products/products'
import Testimonials from './Components/Rating/testimonials'
import YouTube from './Components/YouTubeSection/YouTube'
function App() {
 

  return (
    <>
      <Navbar />
      <Header />
      <Categories />
      <Offers />
      <Products />
      
      {/* <HotProducts /> */}
      <Services />
      <YouTube />
      <Testimonials />

      <Footer />
    </>
  )
}

export default App
