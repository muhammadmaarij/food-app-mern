import React, { useState } from "react";

const buttonStyles = {
  backgroundColor: "#007f73",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background-color 0.2s ease, transform 0.2s ease",
};

const CustomButton = ({ text, onClick, style }) => {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const combinedStyles = {
    ...buttonStyles,
    ...(hover ? { backgroundColor: "#0056b3", transform: "scale(1.05)" } : {}),
    ...(active ? { backgroundColor: "#00437c", transform: "scale(0.95)" } : {}),
    ...style,
  };

  return (
    <button
      style={combinedStyles}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
      {text}
    </button>
  );
};

export default CustomButton;
