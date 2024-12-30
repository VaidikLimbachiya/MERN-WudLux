import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Categories from '../../Components/Categories/Categories';
import Products from '../../Components/Products/Products';
import HotProducts from '../../Components/HotProducts/HotProducts';
import YouTube from '../../Components/YouTubeSection/YouTube';
import Testimonials from '../../Components/Rating/testimonials'; // Adjust this path as needed
import Services from '../../Components/Services/service';



function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Header />
      <Categories />
      <Services />
      <HotProducts />
      <Products />
      <YouTube />
      <Testimonials />
      {/* <Footer /> */}
    </>
  );
}

export default Home;
