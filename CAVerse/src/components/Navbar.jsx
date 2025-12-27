// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { TiAdjustContrast } from "react-icons/ti";
import { HiMenu, HiX } from "react-icons/hi";
import { useTheme } from "./ThemeContext"; // adjust path if needed
import logo from "../assets/image.png"; // or "/image.png" if in public/

const navLinks = [
  { to: "/", text: "Home" },
  { to: "/about", text: "About" },
  // { to: "/courses", text: "Courses" },               // standardized lowercase
  { to: "/courses", text: "MoneyBackCourses" }, // unique path
  { to: "/blogs", text: "Blogs" },
  { to: "/contact", text: "Contact" },
  // { to: "/login", text: "Login" },
   { to: "/Dashboard", text: "Dashboard" }, 
];

function Navbar({ showOffer }) {
  const { pathname } = useLocation();
  const { darkMode, toggleMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const getLinkClasses = (isActive) =>
    `transition-all duration-300 font-medium ${
      isActive
        ? darkMode
          ? "text-yellow-300 border-b-2 border-yellow-300"
          : "text-blue-600 border-b-2 border-blue-600"
        : darkMode
          ? "hover:text-yellow-200"
          : "hover:text-blue-500"
    }`;

  const getMobileLinkClasses = (isActive) =>
    `block py-3 px-5 rounded-lg transition-all duration-300 font-medium ${
      isActive
        ? darkMode
          ? "bg-yellow-300/20 text-yellow-300"
          : "bg-blue-600/20 text-blue-600"
        : darkMode
          ? "hover:bg-white/10"
          : "hover:bg-black/5"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[90] p-4 shadow-lg transition-all duration-300
        ${showOffer ? "mt-10 md:mt-12" : "mt-10"} // push down when offer bar is visible
        ${darkMode ? "bg-black/90 backdrop-blur-md text-white" : "bg-white/90 backdrop-blur-md text-black"}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="CaVerse Logo"
            className="w-10 h-10 rounded-full object-cover border-2 border-white/30 shadow-md"
          />
          <h1 className="text-2xl font-extrabold tracking-tight">CaVerse</h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={getLinkClasses(pathname === link.to)}
              aria-current={pathname === link.to ? "page" : undefined}
            >
              {link.text}
            </Link>
          ))}

          <button
            onClick={toggleMode}
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            className="cursor-pointer p-2 rounded-full hover:bg-white/10 transition"
          >
            <TiAdjustContrast size={28} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleMode}
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <TiAdjustContrast size={28} />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="text-3xl focus:outline-none"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-5 space-y-2 bg-inherit rounded-xl p-6 shadow-2xl border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={getMobileLinkClasses(pathname === link.to)}
              aria-current={pathname === link.to ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.text}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;