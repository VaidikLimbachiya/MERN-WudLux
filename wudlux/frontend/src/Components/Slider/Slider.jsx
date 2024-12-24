import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";

const Slider = () => {
  const sliderData = [
    {
      title: "Wooden Kitchenware",
      description: "Sale offer 10% off this week",
      button: "Shop Now",
      image: "/assets/header.png", // Replace with actual image path
    },
    {
      title: "Elegant Serveware",
      description: "Get the best deals this season",
      button: "Explore",
      image: "/images/serveware.jpg", // Replace with actual image path
    },
    {
      title: "Stylish Tableware",
      description: "Upgrade your dining experience",
      button: "Discover",
      image: "/images/tableware.jpg", // Replace with actual image path
    },
  ];

  return (
    <div className="slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="swiper-container"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slider-content">
              <div className="slider-text">
                <p className="sale-offer">
                  <span>{slide.description.split(" ")[0]}</span>{" "}
                  {slide.description.slice(slide.description.indexOf(" ") + 1)}
                </p>
                <h1 className="slider-heading">{slide.title}</h1>
                <button className="shop-now">
                  {slide.button} <span>→</span>
                </button>
              </div>
              <div className="slider-image">
                <img src={slide.image} alt={slide.title} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
