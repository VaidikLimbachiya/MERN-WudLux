import { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header';
import Categories from '../../Components/categories/categories';
import Products from '../../Components/Products/Products';
import HotProducts from '../../Components/HotProducts/HotProducts';
import YouTube from '../../Components/YouTubeSection/YouTube';
import Testimonials from '../../Components/Rating/testimonials';
import Services from '../../Components/Services/service';
import Offers from '../../Components/offers/offers';
import NewLaunch from '../../Components/NewLaunch/NewLaunch';

function Home() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 430);

  useEffect(() => {
    const updateView = () => {
      setIsMobileView(window.innerWidth <= 430); // Only show NewLaunch for <= 430px
    };

    window.addEventListener("resize", updateView);
    updateView(); // Check on mount

    return () => window.removeEventListener("resize", updateView);
  }, []);

  return (
    <>
      <Header />
      <Categories />
      <Offers />
      {isMobileView ? <NewLaunch /> : <Products />} {/* Toggle based on screen width */}
      <Services />
      <HotProducts />
      <YouTube />
      <Testimonials />
    </>
  );
}

export default Home;
