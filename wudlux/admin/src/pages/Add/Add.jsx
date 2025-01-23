import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [images, setImages] = useState([]);
  const [variantImages, setVariantImages] = useState([]);
  const [data, setData] = useState({
    category: "Serveware",
    subcategory: "Tray",
    title: "",
    price: "",
    originalPrice: "",
    discount: "",
    size: { L: "", B: "", H: "" },
    materials: "Wood",
    description: "",
  });

  const categories = {
    Serveware: ["Tray", "Platter", "Bowl"],
    Tableware: ["Fruit Bowl", "Tissue Holder", "Lazy Susan", "Cutlery Caddy"],
    Kitchenware: ["Chopping Board", "Tissue Holder", "Collection"],
  };

  const materialOptions = ["Acacia Wood", "Teak Wood", "Mango Wood"];

  const fetchProductsByCategory = async (category, subCategory) => {
    const query = new URLSearchParams({ category, subCategory });
    const response = await fetch(`/api/products/listByCategory?${query}`);
    const products = await response.json();
    return products;
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "category") {
      setData((prevData) => ({
        ...prevData,
        category: value,
        subcategory: categories[value][0],
      }));
    } else if (name === "L" || name === "B" || name === "H") {
      setData((prevData) => ({
        ...prevData,
        size: { ...prevData.size, [name]: value },
      }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const onFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const onVariantFileChange = (event) => {
    const files = Array.from(event.target.files);
    const uniqueFiles = files.filter(
      (file) =>
        !variantImages.some((existingFile) => existingFile.name === file.name)
    );
    setVariantImages((prevImages) => [...prevImages, ...uniqueFiles]);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("subcategory", data.subcategory);
    formData.append("price", Number(data.price));
    formData.append("originalPrice", Number(data.originalPrice));
    formData.append("discount", Number(data.discount));
    formData.append(
      "size",
      JSON.stringify([{ L: data.size.L, B: data.size.B, H: data.size.H }])
    );
    formData.append("materials", JSON.stringify(data.materials));
    formData.append("description", data.description);

    images.forEach((image) => formData.append("images", image));
    variantImages.forEach((image) => formData.append("variantImages", image));

    try {
      const response = await axios.post("http://localhost:5000/api/products/add", formData);
      if (response.data.success) {
        setData({
          title: "",
          category: "Serveware",
          subcategory: "Tray",
          price: "",
          originalPrice: "",
          discount: "",
          size: { L: "", B: "", H: "" },
          materials: [],
          description: "",
        });
        setImages([]);
        setVariantImages([]);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to create product!");
    }
  };

  return (
    <div className="add">
      <form onSubmit={onSubmitHandler}>
        {/* Image Upload Section */}
        <div className="add-img-upload">
          <p>Upload Main Images</p>
          <label htmlFor="images">
            <img
              className="image-preview"
              src={
                images.length > 0
                  ? URL.createObjectURL(images[0])
                  : assets.upload_area
              }
              alt="Product"
            />
          </label>
          <input
            onChange={onFileChange}
            type="file"
            id="images"
            multiple
            hidden
            required
          />
        </div>

        {/* Variant Image Upload */}
        <div className="add-variant-images">
          <p>Upload Variant Images</p>
          <label htmlFor="variantImages">
            <img
              className="image-preview"
              src={assets.upload_area}
              alt="Variant Upload"
            />
          </label>
          <input
            onChange={onVariantFileChange}
            type="file"
            id="variantImages"
            multiple
            hidden
          />
          {/* Preview Variant Images */}
          <div className="variant-images-preview">
            {variantImages.length > 0 &&
              variantImages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Variant ${index + 1}`}
                  className="variant-image"
                />
              ))}
          </div>
        </div>

        {/* Product Title */}
        <div className="add-product-name">
          <p>Product Title</p>
          <input
            onChange={onChangeHandler}
            value={data.title}
            type="text"
            name="title"
            placeholder="Type here"
            required
          />
        </div>

        {/* Category Selection */}
        <div className="add-category">
          <p>Product Category</p>
          <select
            className="selectt"
            onChange={onChangeHandler}
            name="category"
            value={data.category}
          >
            {Object.keys(categories).map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Selection */}
        <div className="add-subcategory">
          <p>Product Subcategory</p>
          <select
            className="selectt"
            onChange={onChangeHandler}
            name="subcategory"
            value={data.subcategory}
          >
            {categories[data.category].map((subcategory, index) => (
              <option key={index} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </div>

        {/* Price Inputs */}
        <div className="add-price">
          <p>Product Price</p>
          <input
            className="inputclasa"
            onChange={onChangeHandler}
            value={data.price}
            type="number"
            name="price"
            placeholder="₹20"
            required
          />
        </div>

        {/* Original Price and Discount */}
        <div className="add-original-discount">
          <p>Original Price</p>
          <input
            onChange={onChangeHandler}
            value={data.originalPrice}
            type="number"
            name="originalPrice"
            placeholder="₹30"
          />
          <p>Discount</p>
          <input
            onChange={onChangeHandler}
            value={data.discount}
            type="number"
            name="discount"
            placeholder="10%"
          />
        </div>

        {/* Size Inputs */}
        <div className="add-size">
          <p>Product Size (L x B x H)</p>
          <input
            onChange={onChangeHandler}
            value={data.size.L}
            type="number"
            name="L"
            placeholder="Length"
          />
          <input
            onChange={onChangeHandler}
            value={data.size.B}
            type="number"
            name="B"
            placeholder="Breadth"
          />
          <input
            onChange={onChangeHandler}
            value={data.size.H}
            type="number"
            name="H"
            placeholder="Height"
          />
        </div>

        {/* Materials Selection */}
        <div className="add-materials">
          <p>Materials</p>
          <select
            className="selectt"
            onChange={onChangeHandler}
            name="materials"
            value={data.materials}
          >
            {materialOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Description Input */}
        <div className="add-description">
          <p>Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            placeholder="Product description"
            rows="4"
            required
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Add;
