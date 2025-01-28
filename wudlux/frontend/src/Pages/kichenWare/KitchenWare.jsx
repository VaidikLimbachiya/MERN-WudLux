// import React from 'react'
// import Navbar from '../../Components/Navbar/Navbar'
// import brackfast from "../../assets/brackfast.jpg";
import HeroImage from "../../assets/kitchen.png";
import Filters from "../../Components/Filter/Filter";
import Productlist from "../../Components/ProductList/Productlist";
import CaroProduct from "../../Components/carousalProduct/caroProduct"
import Services from "../../Components/Services/service";

const KitchenWare = () => {
  return (
    
    <div >
      <header
              className="hero-section"
              style={{ backgroundImage: `url(${HeroImage})` }}
            >
            </header>
       <Filters />
       <Productlist />
       <Services />
       <CaroProduct />
    </div>
  )
}

export default KitchenWare;