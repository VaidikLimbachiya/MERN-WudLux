import { useState, useEffect } from "react";
import "./Header.css";
import backgroundImage1 from "../../assets/header.png";
import backgroundImage2 from "../../assets/header2.png";
import backgroundImage3 from "../../assets/header3.png";

const Slider = () => {
  const slides = [
    {
      image: backgroundImage1,
      heading: "Wooden",
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

  const totalSlides = slides.length;
  const extendedSlides = [slides[totalSlides - 1], ...slides, slides[0]]; // Clone first & last for smooth looping

  const [currentIndex, setCurrentIndex] = useState(1); // Start at first real slide
  const [isTransitioning, setIsTransitioning] = useState(true);

<<<<<<< HEAD
  //   Auto Slide Every 3 Seconds
=======
  // Auto Slide Every 3 Seconds
>>>>>>> 335fefab1947c264ce085c2cd630dfb273119e0a
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
<<<<<<< HEAD
  }, [currentIndex]); //   Fixed dependency

  //   Handle Next Slide (Seamless Loop)
=======
  }, [currentIndex]); // Fixed dependency

  // Handle Next Slide (Seamless Loop)
>>>>>>> 335fefab1947c264ce085c2cd630dfb273119e0a
  const nextSlide = () => {
    if (currentIndex < totalSlides) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsTransitioning(false);
      setCurrentIndex(0); // Instantly jump
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(1); // Reset smoothly
      }, 50);
    }
  };


<<<<<<< HEAD
  //   Handle Dot Click
=======
  // Handle Dot Click
>>>>>>> 335fefab1947c264ce085c2cd630dfb273119e0a
  const handleDotClick = (index) => {
    setCurrentIndex(index + 1); // Offset by 1 because of cloned slides
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

<<<<<<< HEAD
      {/*   Dots Navigation */}
=======
      {/* Dots Navigation */}
>>>>>>> 335fefab1947c264ce085c2cd630dfb273119e0a
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