/* eslint-disable react-refresh/only-export-components */
// src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const [palette, setPalette] = useState(() => {
    const saved = localStorage.getItem("palette");
    return saved || "indigo"; // default palette
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("palette", palette);
  }, [palette]);

  const toggleMode = () => setDarkMode((prev) => !prev);
  const setPaletteColor = (name) => setPalette(name);

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleMode, palette, setPaletteColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);