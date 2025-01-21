import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    category: "Serveware",
    subcategory: "Tray",
    title: "",
    price: "",
    originalPrice: "",
    discount: "",
    size: { L: "", B: "", H: "" },
    materials: "Wood",
  });

  const categories = {
    Serveware: ["Tray", "Platter", "Bowl"],
    Tableware: [
      "Fruit Bowl",
      "Tissue Holder",
      "Lazy Susan",
      "Cutlery caddy",
    ],
    Kitchenware: ["Chopping Board", "Tissue Holder", "Collection"],
  };

  const materialOptions = ["Acacia Wood", "Teak Wood", "Mongo Wood"];

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "category") {
      // Update the category and reset subcategory to the first value
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

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("subcategory", data.subcategory);
    formData.append("price", Number(data.price));
    formData.append("originalPrice", Number(data.originalPrice));
    formData.append("discount", Number(data.discount));
    formData.append("size", JSON.stringify([{ L: data.size.L, B: data.size.B, H: data.size.H }]));

    formData.append("materials", JSON.stringify(data.materials));
    formData.append("image", image);
  
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
        });
        setImage(null);
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
      <form className="" onSubmit={onSubmitHandler}>
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              className="image"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
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
        <div className="add-category  ">
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
        <div className="add-price  ">
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
        <div className="add-original-discount  ">
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
        <div className="add-size  ">
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
        <button>Add</button>
      </form>
    </div>
  );
};

export default Add;