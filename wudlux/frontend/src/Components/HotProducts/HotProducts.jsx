import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { Navigation } from "swiper/modules";
import prev from "../../assets/prev.png"; 
import next from "../../assets/next.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./HotProducts.css";

import image1 from "../../assets/hp1.png";
import image2 from "../../assets/hp2.png";
import image3 from "../../assets/hp3.png";
import image4 from "../../assets/hp4.png";
import image5 from "../../assets/hp5.png";
import image6 from "../../assets/hp6.png";

const products = [
  { image: image1, name: "Wooden Bowl", link: "/product-1" },
  { image: image2, name: "Wooden Tray", link: "/product-2" },
  { image: image3, name: "Tissue Holder", link: "/product-3" },
  { image: image4, name: "Chopping Board", link: "/product-4" },
  { image: image5, name: "Butcher Board", link: "/product-5" },
  { image: image6, name: "Serving Platter", link: "/product-6" },
];

const HotProducts = () => {
  const swiperRef = useRef(null);

  return (
    <div className="grid-section">
      <div className="section-heading">
        <h2 className="heading-title">Hot Products</h2>
        <div className="heading-underline"></div>
        <p className="heading-subtitle">
          Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero est.
        </p>
      </div>

      {/* Desktop Grid */}
      <div className="grid-gallery">
        {products.map((product, index) => (
          <div key={index} className={`grid-item item${index + 1}`}>
            <img src={product.image} alt={product.name} loading="lazy" />
            <div className="hover-overlay">
              <span className="hover-text">{product.name}</span>
              <a href={product.link} className="hover-link">Shop Now</a>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="carousel-gallery">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="swiper-container"
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="carousel-item">
                <img src={product.image} alt={product.name} loading="lazy" />
                <div className="carousel-overlay">
                  <span className="carousel-text">{product.name}</span>
                  <a href={product.link} className="carousel-link">Shop Now</a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="sliderButtons">
          <button className="prevButton" onClick={() => swiperRef.current?.slidePrev()}>
            <img src={prev} alt="" />
          </button>
          <button className="nextButton" onClick={() => swiperRef.current?.slideNext()}>
            <img src={next} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotProducts;
