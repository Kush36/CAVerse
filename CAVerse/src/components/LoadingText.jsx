// src/components/LoadingText.jsx
import React from "react";
import "./LoadingText.css";

const LoadingText = () => {
  return (
    <div className="loading loadingT">
      {["C", "a", "V", "e", "r", "s", "e"].map((letter, i) => (
        <span key={i} data-text={letter} style={{ animationDelay: `${i * 0.1}s` }}>
          {letter}
        </span>
      ))}
    </div>
  );
};

export default LoadingText;