import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ProductListPage.css"; // Import the CSS file for styling
import Header from "../components/Header";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/fetchProducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/deleteProduct/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <Header />

      <div className="product-list-container">
        <h1>Product List</h1>
        <Link to="/admin/add-product" className="add-product-link">
          Add New Product
        </Link>
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${encodeURIComponent(
                      product.pimage
                    )}`}
                    alt={product.pname}
                    className="product-image"
                  />
                </td>
                <td>{product.pname}</td>
                <td>{product.ptitle}</td>
                <td>{product.pdescription}</td>
                <td>{product.pprice}</td>
                <td>{product.pcategory}</td>
                <td className="action-buttons">
                  <Link
                    to={`/admin/edit-product/${product._id}`}
                    className="edit-button"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListPage;
