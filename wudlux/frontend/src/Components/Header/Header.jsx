import { useState, useEffect } from "react";
import "./Header.css";
import backgroundImage1 from "../../assets/header.png";
import backgroundImage2 from "../../assets/header2.jpeg";
import backgroundImage3 from "../../assets/header3.jpeg";

/* Mobile-specific images */
import mobileImage1 from "../../assets/Mheader1.png";
import mobileImage2 from "../../assets/Mheader2.png";
import mobileImage3 from "../../assets/Mheader3.png";

const Slider = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 431);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 431);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = [
    {
      image: isMobile ? mobileImage1 : backgroundImage1, // Use mobile image when on mobile view
      heading: "Wooden",
      SubHading: "Kitchenware",
      subheading: "Sale offer 10% off this week",
    },
    {
      image: isMobile ? mobileImage2 : backgroundImage2,
      heading: "Wooden",
      SubHading: "Kitchenware",
      subheading: "Sale offer 10% off this week",
    },
    {
      image: isMobile ? mobileImage3 : backgroundImage3,
      heading: "Wooden",
      SubHading: "Kitchenware",
      subheading: "Sale offer 10% off this week",
    },
  ];

  const totalSlides = slides.length;
  const extendedSlides = [slides[totalSlides - 1], ...slides, slides[0]];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    if (currentIndex < totalSlides) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsTransitioning(false);
      setCurrentIndex(0);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(1);
      }, 50);
    }
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index + 1);
  };

  return (
    <div className="slider-container">
      <div
        className="slider-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {extendedSlides.map((slide, index) => (
          <div
            key={index}
            className="banner"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="banner-content fade-in">
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

      {/*   Dots Navigation */}
      <div className="dots-container">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index + 1 === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
