// import React from "react";
import "./service.css"; // CSS file for styling

// Import your icons from the assets folder
import shippingIcon from "../../assets/icon1.png";
import supportIcon from "../../assets/icon2.png";
import moneyReturnIcon from "../../assets/icon3.png";
import discountIcon from "../../assets/icon4.png";

const Services = () => {
  const services = [
    {
      icon: shippingIcon, // Path to the image file
      title: "Free Shipping",
      description: "Free Shipping all orders",
    },
    {
      icon: supportIcon, // Path to the image file
      title: "Support 24/7",
      description: "Support 24 hours a day",
    },
    {
      icon: moneyReturnIcon, // Path to the image file
      title: "Money Return",
      description: "7 days for free return",
    },
    {
      icon: discountIcon, // Path to the image file
      title: "Order Discount",
      description: "On every order over ₹299",
    },
  ];

  return (
    <section className="services">
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">
              <img src={service.icon} alt={`${service.title} icon`} />
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
