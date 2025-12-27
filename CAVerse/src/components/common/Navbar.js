// src/components/common/Navbar.js
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-2xl z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="text-4xl font-black bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
          CaVerse
        </Link>

        <div className="hidden md:flex items-center gap-10 text-lg">
          <Link to="/" className="hover:text-purple-400 transition">Home</Link>
          <Link to="/foundation" className="hover:text-purple-400 transition">Foundation</Link>
          <Link to="/intermediate" className="hover:text-purple-400 transition">Intermediate</Link>
          <Link to="/final" className="hover:text-purple-400 transition">Final</Link>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition shadow-lg"
              >
                Dashboard
              </Link>
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-3xl text-purple-400" />
                <span className="font-semibold">{user.name.split(" ")[0]}</span>
                <button
                  onClick={() => { logout(); navigate("/"); }}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <FaSignOutAlt size={22} />
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition shadow-xl"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}