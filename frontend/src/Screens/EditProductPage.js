import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditProductPage.css";

const EditProductPage = () => {
  const [product, setProduct] = useState({
    pname: "",
    ptitle: "",
    pdescription: "",
    pprice: "",
    pcategory: "",
    pimage: null,
  });
  const navigate = useNavigate();
  const { productId } = useParams();

  const categories = [
    { name: "Grocery" },
    { name: "Bakery" },
    { name: "Gourmet" },
    { name: "Wheat" },
    { name: "Health" },
    { name: "Beauty" },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/fetchProduct/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

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
    if (product.pimage) {
      formData.append("pimage", product.pimage);
    }

    try {
      await axios.put(`/updateProduct/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin/product-list");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="edit-product-container">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit} className="edit-product-form">
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
        />

        <button type="submit" className="submit-button">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
