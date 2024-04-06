import React from 'react';

function HomeScreen() {
  return (
    <div className="home-screen">
      <h1 className="store-name">Kirana Shop</h1>
      <div className="trending-section">
        <h2>Trending Items</h2>
        <div className="scroll-container">
          <i className="fas fa-chevron-left arrow-icon"></i> {/* Left arrow icon */}
          <div className="trending-items">
            {/* Add trending items here as circular avatars with names */}
          </div>
          <i className="fas fa-chevron-right arrow-icon"></i> {/* Right arrow icon */}
        </div>
      </div>
      <div className="sale-section">
        <h2>Sale Items</h2>
        <div className="sale-items">
          {/* Add sale items here as cards with name, price, and description */}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
