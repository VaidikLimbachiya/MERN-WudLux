import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Categories from '../../Components/categories/categories'
import Footer from '../../Components/Footer/Footer'
import Testimonials from '../../Components/Rating/testimonials'
import Services from '../../Components/Services/service'
import Header from '../../Components/Header/Header'
import Offers from '../../Components/offers/offers'
import Products from '../../Components/Products/products'
import HotProducts from '../../Components/HotProducts/HotProducts'
import YouTube from '../../Components/YouTubeSection/YouTube'

export const Home = () => {
  return (
      <div>
        <Navbar />
        <Header />
        <Categories />
        <Offers />
        <Products />
        <Services />
        <HotProducts />
        <YouTube />
        <Testimonials />
        <Footer />
      </div>
  )
}
