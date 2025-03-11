import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext";
import "./Products.css";
import bagIcon from "../../assets/bag.svg";
import prev from "../../assets/prev.png"; // Ensure correct path
import next from "../../assets/next.png"; // Ensure correct path
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsArrowRight } from "react-icons/bs";
// import arr from "../../assets/arr.png"; // Ensure correct path

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCartContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showAll, setShowAll] = useState(false); // State to toggle product display

  const sliderRef = useRef(null); // Slider reference

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/list/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        if (result.success) {
          setProducts(result.data);
        } else {
          throw new Error("Failed to fetch products: " + result.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="productsSection">
      <div className="productsHeader">
        <h2 className="productsTitle">
          Newly Launched
          <div className="titleUnderline"></div>
        </h2>
        <p className="productsSubtitle">
          Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero
          est...
        </p>
      </div>

      {isMobile ? (
        <div className="sliderContainer">
          <Slider ref={sliderRef} {...sliderSettings}>
            {loading ? (
              <div className="loadingSpinner">Loading products...</div>
            ) : error ? (
              <div className="errorMessage">⚠️ Error: {error}</div>
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <div
                  className="productCard"
                  key={product.id || index}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/product-info/${product._id}`, {
                      state: { product },
                    });
                  }}
                >
                  <div className="productImageWrapper">
                    <img
                      className="productImage"
                      crossOrigin="anonymous"
                      src={`http://localhost:5000/uploads/${
                        Array.isArray(product.images)
                          ? product.images[0]
                          : product.images
                      }`}
                      alt={product.title}
                      loading="lazy"
                    />
                    {product.discount > 0 && (
                      <div className="discountBadge">
                        {product.discount}% OFF
                      </div>
                    )}
                    <div className="addToBagWrapper">
                      <button
                        className="addToBagButton"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({ ...product, quantity: 1 });
                        }}
                      >
                        Add to Bag{" "}
                        <img
                          src={bagIcon}
                          alt="Bag Icon"
                          className="bagIcon"
                          loading="lazy"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="productDetails">
                    {/* <p className="shop-product-list-title">{product.title}</p> */}
                    <p className="shop-product-list-desc">
                      {product.description}
                    </p>
                    <div className="productPrice">
                      <span className="currentPrice">
                        ₹{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="originalPrice">
                          ₹{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No products available</div>
            )}
          </Slider>

          {/* Navigation Buttons */}
          <div className="sliderButtons">
            <button
              className="prevButton"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <img src={prev} alt="Previous" />
            </button>
            <button
              className="nextButton"
              onClick={() => sliderRef.current.slickNext()}
            >
              <img src={next} alt="Next" />
            </button>
          </div>
        </div>
      ) : (
        <div className="productsGrid">
          {loading ? (
            <div className="loadingSpinner">Loading products...</div>
          ) : error ? (
            <div className="errorMessage">⚠️ Error: {error}</div>
          ) : products.length > 0 ? (
            (showAll ? products : products.slice(0, 8)).map(
              (product, index) => (
                <div
                  className="productCard"
                  key={product.id || index}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/product-info/${product._id}`, {
                      state: { product },
                    });
                  }}
                >
                  <div className="productImageWrapper">
                    <img
                      className="productImage"
                      crossOrigin="anonymous"
                      src={`http://localhost:5000/uploads/${
                        Array.isArray(product.images)
                          ? product.images[0]
                          : product.images
                      }`}
                      alt={product.title}
                      loading="lazy"
                    />
                    {product.discount > 0 && (
                      <div className="discountBadge">
                        {product.discount}% OFF
                      </div>
                    )}
                    <div className="addToBagWrapper">
                      <button
                        className="addToBagButton"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({ ...product, quantity: 1 });
                        }}
                      >
                        Add to Bag{" "}
                        <img
                          src={bagIcon}
                          alt="Bag Icon"
                          className="bagIcon"
                          loading="lazy"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="productDetails">
                    {/* <p className="shop-product-list-title">{product.title}</p> */}
                    <p className="shop-product-list-desc">
                      {product.description}
                    </p>
                    <div className="productPrice">
                      <span className="currentPrice">
                        ₹{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="originalPrice">
                          ₹{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div>No products available</div>
          )}
        </div>
      )}
      {products.length > 8 && (
        <button
          className="newLaunchViewAll"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All"}
          
            {/* <img src={arr} alt="Arrow Icon" /> */}
            <BsArrowRight className="rightarrow"/>
          
        </button>
      )}
    </div>
  );
};

export default Products;
