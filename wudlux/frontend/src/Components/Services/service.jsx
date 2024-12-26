// import React from "react";
import { BiSupport } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa6";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import "./service.css"; // CSS file for styling

const Services = () => {
  const services = [
    {
      icon: <FaShippingFast />, // Replace this with an image or an icon component if necessary
      title: "Free Shipping",
      description: "Free Shipping all orders",
    },
    {
      icon: <BiSupport />, // Replace with an icon
      title: "Support 24/7",
      description: "Support 24 hours a day",
    },
    {
      icon: <FaPiggyBank />, // Replace with an icon
      title: "Money Return",
      description: "7 days for free return",
    },
    {
      icon: <TbRosetteDiscountCheck />, // Replace with an icon
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
              {service.icon}
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