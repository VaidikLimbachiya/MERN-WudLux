import { useState, useEffect } from "react";
import "./Testimonials.css";
import person1 from "../../assets/person1.png";
import person2 from "../../assets/person2.png";
import person3 from "../../assets/person3.png";
import person4 from "../../assets/person4.png";
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Leslie Alexander",
      title: "Product Manager",
      image: person1,
      rating: 4,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.",
    },
    {
      id: 2,
      name: "Cody Fisher",
      title: "Product Manager",
      image: person2,
      rating: 3,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.",
    },
    {
      id: 3,
      name: "Bessie Cooper",
      title: "Product Manager",
      image: person3,
      rating: 2,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.",
    },
    {
      id: 4,
      name: "Kathryn Murphy",
      title: "Product Manager",
      image: person4,
      rating: 4,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen width on mount
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const renderRating = (rating) => {
    const filledStars = "⭐".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return `${filledStars}${emptyStars}`;
  };

  if (!isMobile) {
    // Desktop View: Show multiple testimonials
    return (
      <div className="testimonials-section">
        <h2 className="testimonials-title">
          Our Testimonials
          <div className="title-underline"></div> {/* Underline for the title */}
        </h2>
        <p className="testimonials-subtitle">See what people are saying...</p>
        <div className="testimonials-carousel">
          {testimonials.slice(currentIndex, currentIndex + 4).map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">
                {renderRating(testimonial.rating)}
              </div>
              <p className="testimonial-review">{testimonial.review}</p>
              <div className="testimonial-user">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-user-image"
                  loading="lazy"
                />
                <div>
                  <p className="testimonial-user-name">{testimonial.name}</p>
                  <p className="testimonial-user-title">{testimonial.title}</p>
                </div>
              </div>
              <div className="underline"></div>
            </div>
          ))}
        </div>
        <div className="carousel-controls">
          <button className="carousel-button" onClick={handlePrev}>
          <BsArrowLeft  className="arr"/>
          </button>
          <button className="carousel-button" onClick={handleNext}>
          <BsArrowRight className="arr" />
          </button>
        </div>
      </div>
    );
  } else {
    // Mobile View: Show one testimonial at a time
    return (
      <div className="testimonials-section">
        <h2 className="testimonials-title">
          Our Testimonials
          <div className="title-underline"></div> {/* Underline for the title */}
        </h2>
        <p className="testimonials-subtitle">See what people are saying...</p>
        <div className="testimonials-carousel">
          <div key={testimonials[currentIndex].id} className="testimonial-card">
            <div className="testimonial-rating">
              {renderRating(testimonials[currentIndex].rating)}
            </div>
            <p className="testimonial-review">
              {testimonials[currentIndex].review}
            </p>
            <div className="testimonial-user">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="testimonial-user-image"
                loading="lazy"
              />
              <div>
                <p className="testimonial-user-name">
                  {testimonials[currentIndex].name}
                </p>
                <p className="testimonial-user-title">
                  {testimonials[currentIndex].title}
                </p>
              </div>
            </div>
            <div className="underline"></div>
          </div>
        </div>
        <div className="carousel-controls">
          <button className="carousel-button" onClick={handlePrev}>
          <BsArrowLeft className="arr"/>
          </button>
          <button className="carousel-button" onClick={handleNext}>
            <BsArrowRight className="arr" />
          </button>
        </div>
      </div>
    );
  }
};

export default Testimonials;
