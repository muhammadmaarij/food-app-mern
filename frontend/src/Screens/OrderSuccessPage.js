import React from "react";
import { Link } from "react-router-dom";
import "../styles/OrderSuccessPage.css"; // Make sure you link the correct CSS file
import { useLocation } from "react-router-dom";

const OrderSuccessPage = () => {
  // You would get orderDetails passed as a prop or from context/store
  const location = useLocation();
  const { orderDetails } = location.state;

  return (
    <div className="order-success-container">
      <div className="order-success-header">
        <h1>Thank you, {orderDetails.customerInfo.name}!</h1>
        <p>Order {orderDetails.orderId}</p>
      </div>
      <div className="order-success-content">
        <div className="order-summary">
          <h2>Your order is confirmed</h2>
          <p>
            COD is only applicable on local orders below 60,000 PKR. If your
            order amount does not fall within this range or the shipping country
            is other than Pakistan, our team will contact you for payment via
            bank transfer.
          </p>

          {/* Order Details */}
          <div className="order-details">
            <h3>Order details</h3>
            <div>Contact information</div>
            <div>{orderDetails.customerInfo.email}</div>
            <div>Shipping address</div>
            <div>{orderDetails.customerInfo.address}</div>
            <div>{orderDetails.customerInfo.contact}</div>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            {orderDetails?.cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img
                  src={`http://localhost:5000/uploads/${encodeURIComponent(
                    item.pimage
                  )}`}
                  alt={item.pname}
                  className="product-image"
                />
                <div className="item-details">
                  <span className="item-name">{item.pname}</span>
                  <span className="item-quantity">
                    Quantity: {item.quantity}
                  </span>
                  <span className="item-price">Price: {item.pprice}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Info */}
          <div className="payment-info">
            <div>Payment method</div>
            <div>Cash on Delivery (COD) - ₹{orderDetails.amount}</div>
          </div>

          <div className="order-total">
            <div className="order-total-row">
              <div className="order-total-title">Subtotal</div>
              <div>{orderDetails.amount}</div>
            </div>
            <div className="order-total-row">
              <div className="order-total-title">Shipping</div>
              <div>free</div>
            </div>
            <div className="order-total-row">
              <div className="order-total-title">Total</div>
              <div>{orderDetails.amount}</div>
            </div>
          </div>

          <Link to="/landingPage">Return to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
