import { useState } from "react";
import HeroImage from "../../assets/kitchen.png";
import Filters from "../../Components/Filter/Filter";
import Productlist from "../../Components/ProductList/Productlist";
import Services from "../../Components/Services/service";

const KitchenWare = () => {
  const [filters, setFilters] = useState({
    material: "",
    priceRange: { min: "", max: "" },
    sortOption: "Latest",
  });

  return (
    <div>
      <header className="hero-section" style={{ backgroundImage: `url(${HeroImage})` }}></header>
      <Filters filters={filters} setFilters={setFilters} />
      <Productlist appliedFilters={filters} />
      <Services />
    </div>
  );
};

export default KitchenWare;
