import { useState, useEffect } from "react";
import "./Header.css";
import backgroundImage1 from "../../assets/header.png";
import backgroundImage2 from "../../assets/header2.png";
import backgroundImage3 from "../../assets/header3.png";

const Slider = () => {
  const slides = [
    {
      image: backgroundImage1,
      heading: "Wooden ",
      SubHading: "Kitchenware",
      subheading: "Sale offer 10% off this week",
    },
    {
      image: backgroundImage2,
      heading: "Wooden",
      SubHading: "Kitchenware",
      subheading: "Sale offer 10% off this week",
    },
    {
      image: backgroundImage3,
      heading: "Wooden",
      SubHading: "Kitchenware",
      subheading: "Sale offer 10% off this week",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="banner"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="banner-content">
              <div className="sale-offer">
                <hr className="line-offer" />
                <p>
                  <span className="gradient-text">{slide.subheading}</span>
                </p>
                <hr className="line-offer" />
              </div>

              <h1 className="slider-heading">{slide.heading}</h1>
              <h1 className="slider-SubHeading">{slide.SubHading}</h1>
              <button className="shop-now">
                Shop Now <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="dots-container">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
