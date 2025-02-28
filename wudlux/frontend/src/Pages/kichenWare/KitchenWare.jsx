// import Filters from "../../Components/Filter/Filter";
import Productlist from "../../Components/ProductList/Productlist";
import Products from "../../Components/Products/Products";
import Services from "../../Components/Services/service";
import HeroImage from "../../assets/kitchen.png";
import { useLocation } from "react-router-dom";

const KitchenWare = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "";

  return (
    <div>
      <header className="hero-section" style={{ backgroundImage: `url(${HeroImage})` }}></header>
      {/* <Filters category={category}/> */}
      <Productlist category={category} />

      <Services />
      <Products />
    </div>
  );
};

export default KitchenWare;
