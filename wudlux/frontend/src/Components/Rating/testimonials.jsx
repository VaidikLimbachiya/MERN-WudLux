import { useState } from "react";
import "./Testimonials.css";
import person1 from "../../assets/person1.png";
import person2 from "../../assets/person2.png";
import person3 from "../../assets/person3.png";
import person4 from "../../assets/person4.png";
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
      rating: 4,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.",
    },
    {
      id: 3,
      name: "Bessie Cooper",
      title: "Product Manager",
      image: person3,
      rating: 4,
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

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="testimonials-section">
      <h2 className="testimonials-title">Our Testimonials</h2>
      <p className="testimonials-subtitle">See what people are saying...</p>
      <div className="testimonials-carousel">
        {testimonials.slice(currentIndex, currentIndex + 4).map((testimonial, index) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-rating">
              {"⭐".repeat(testimonial.rating)}
            </div>
            <p className="testimonial-review">{testimonial.review}</p>
            <div className="testimonial-user">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-user-image"
              />
              <div>
                <p className="testimonial-user-name">{testimonial.name}</p>
                <p className="testimonial-user-title">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button className="carousel-button" onClick={handlePrev}>
          &#8592;
        </button>
        <button className="carousel-button" onClick={handleNext}>
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
