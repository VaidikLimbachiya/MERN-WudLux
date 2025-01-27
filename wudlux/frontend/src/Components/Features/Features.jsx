import "./Features.css";
import sustainableIcon from "../../assets/sustainable-icon.png";
import ecoFriendlyIcon from "../../assets/eco-friendly-icon.png";
import mindfulLivingIcon from "../../assets/mindful-living-icon.png";

const features = [
  {
    icon: sustainableIcon,
    title: "Sustainable Design",
    description:
      "At Wudlux, we believe that the items you use every day should do more than serve a purpose—they should tell a story. Each piece in our collection is thoughtfully designed and handcrafted, celebrating the unique textures and grains of natural wood. By blending modern aesthetics with age-old techniques, we create products that honor the earth while enhancing your lifestyle.",
  },
  {
    icon: ecoFriendlyIcon,
    title: "Eco-friendly",
    description:
      "Our commitment to sustainability is at the heart of everything we do. We source our wood responsibly, ensuring that our products are not only eco-friendly but also built to last. From cutting boards and serving trays to festive hampers and decorative accents, every item reflects our passion for quality and respect for nature.",
  },
  {
    icon: mindfulLivingIcon,
    title: "Mindful Living",
    description:
      "Wudlux is more than a brand; it’s a celebration of mindful living. We’re here to inspire a connection—to your home, to the people you love, and to the planet we all share. Thank you for joining us on this journey. Together, let’s create spaces that feel warm, inviting, and uniquely yours.",
  },
];

const Features = () => {
  return (
    <div className="features-container">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <img src={feature.icon} alt={`${feature.title} Icon`} className="feature-icon" />
          <h2 className="feature-title">{feature.title}</h2>
          <p className="feature-description">{feature.description}</p>
        </div>
      ))} 
    </div>
  );
};

export default Features;
