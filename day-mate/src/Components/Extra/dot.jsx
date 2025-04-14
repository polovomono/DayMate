import React from "react";

const Dot = () => {
  const dotStyle = {
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "white",
    animation: "float 4s ease-in-out infinite",
  };

  return (
    <div
      style={{
        ...dotStyle,
        width: `10px`,
        height: `10px`,
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        animationDelay: `${Math.random() * 5}s`,
      }}
    />
  );
};

export default Dot;
