// src/components/Preloader.jsx
import React, { useEffect, useContext } from "react";
import { ThemeContext } from "../components/ThemeContext"; // Adjust path if needed
import LoadingText from "./LoadingText";
import "./Preloader.css";

const Preloader = () => {
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = document.getElementById("preloader");
      if (loader) {
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.6s ease";
        setTimeout(() => {
          loader.style.display = "none";
        }, 600);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="preloader"
      className={`preloaderBg ${darkMode ? "dark-mode" : ""}`}
    >
      <div className="preloader">
        <div className="preloader2"></div>
      </div>
      <div className="text-animation">
        <LoadingText />
      </div>
    </div>
  );
};

export default Preloader;