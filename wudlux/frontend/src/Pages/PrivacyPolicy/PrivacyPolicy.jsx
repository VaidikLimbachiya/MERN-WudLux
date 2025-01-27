import React from "react";
import "./PrivacyPolicy.css";
import HeroImage from "../../assets/privacy.png";

const PrivacyPolicy = () => {
  return (
    <div className="refund-policy-page">
      {/* Hero Section */}
      <header
        className="hero-section responsive-hero"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="hero-content">
          {/* <h1 className="hero-title">Privacy Policy</h1> */}
        </div>
      </header>

      {/* Policy Content */}
      <main className="content-section responsive-content">
        <section className="policy-content responsive-policy">
          <div className="text-content responsive-text">
            <h2 className="section-title">Introduction</h2>
            <p className="section-paragraph">
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry. Lorem ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book.
            </p>
            <p className="section-paragraph">
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem
              Ipsum.
            </p>

            <h2 className="section-title">Security Measures</h2>
            <p className="section-paragraph">
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry. Lorem ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book.
            </p>

            <h2 className="section-title">Changes to This Privacy Policy</h2>
            <p className="section-paragraph">
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry. Lorem ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book.
            </p>

            <h2 className="section-title">Third-Party Sharing</h2>
            <p className="section-paragraph">
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>

            <h2 className="section-title">Contact Us</h2>
            <p className="section-paragraph">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus
              PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
