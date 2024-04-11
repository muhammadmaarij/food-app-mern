import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddProductPage.css"; // Import the CSS file for styling

const AddProductPage = () => {
  const [product, setProduct] = useState({
    pname: "",
    ptitle: "",
    pdescription: "",
    pprice: "",
    pcategory: "",
    pimage: null,
  });
  const navigate = useNavigate();

  const categories = [
    { name: "Grocery" },
    { name: "Bakery" },
    { name: "Gourmet" },
    { name: "Wheat" },
    { name: "Health" },
    { name: "Beauty" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, pimage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("pname", product.pname);
    formData.append("ptitle", product.ptitle);
    formData.append("pdescription", product.pdescription);
    formData.append("pprice", product.pprice);
    formData.append("pcategory", product.pcategory);
    formData.append("pimage", product.pimage);

    try {
      await axios.post("/postProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin/product-list");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <label htmlFor="pname">Name:</label>
        <input
          type="text"
          id="pname"
          name="pname"
          value={product.pname}
          onChange={handleChange}
          required
        />

        <label htmlFor="ptitle">Title:</label>
        <input
          type="text"
          id="ptitle"
          name="ptitle"
          value={product.ptitle}
          onChange={handleChange}
          required
        />

        <label htmlFor="pdescription">Description:</label>
        <textarea
          id="pdescription"
          name="pdescription"
          value={product.pdescription}
          onChange={handleChange}
          required
        />

        <label htmlFor="pprice">Price:</label>
        <input
          type="text"
          id="pprice"
          name="pprice"
          value={product.pprice}
          onChange={handleChange}
          required
        />
        <label htmlFor="pcategory">Category:</label>
        <select
          id="pcategory"
          name="pcategory"
          value={product.pcategory}
          onChange={handleChange}
          required
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="pimage">Image:</label>
        <input
          type="file"
          id="pimage"
          name="pimage"
          onChange={handleFileChange}
          required
        />

        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
