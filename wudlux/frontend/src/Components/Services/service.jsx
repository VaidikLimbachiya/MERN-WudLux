
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./service.css"; // CSS file for styling

// Import icons
import shippingIcon from "../../assets/icon1.png";
import supportIcon from "../../assets/icon2.png";
import moneyReturnIcon from "../../assets/icon3.png";
import discountIcon from "../../assets/icon4.png";

const Services = () => {
  const services = [
    { icon: shippingIcon, title: "Free Shipping", description: "Free Shipping on all orders" },
    { icon: supportIcon, title: "Support 24/7", description: "Support available 24/7" },
    { icon: moneyReturnIcon, title: "Money Return", description: "7-day free returns" },
    { icon: discountIcon, title: "Order Discount", description: "Discounts on orders over ₹299" },
  ];

  return (
    <section className="services">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="services-slider"
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <div className="service-card">
              <div className="service-icon">
                <img src={service.icon} alt={`${service.title} icon`} loading="lazy" />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Services;
