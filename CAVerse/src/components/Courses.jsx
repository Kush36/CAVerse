// src/pages/Courses.jsx
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext"; // ← make sure this path is correct!

export default function Courses() {
  const { darkMode } = useTheme();

  // Define all dynamic classes here (same as in Home.jsx)
  const cardBg = darkMode ? "bg-white/10" : "bg-[#f7f2ff]/30";
  const borderClass = darkMode ? "border-white/20" : "border-black/20";
  const subtleText = darkMode ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`min-h-screen pt-28 pb-20 px-6 transition-colors duration-300
      ${darkMode ? "bg-gradient-to-br from-gray-950 to-black text-white" : "bg-gradient-to-br from-gray-50 to-white text-gray-900"}`}>

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-black text-center mb-6 tracking-tight
                       bg-gradient-to-r from-amber-500 via-purple-600 to-pink-600 
                       bg-clip-text text-transparent drop-shadow-lg">
          CHOOSE YOUR CA LEVEL
        </h1>

        <p className={`text-center text-lg md:text-xl mb-16 max-w-3xl mx-auto ${subtleText}`}>
          Select the level that matches your current stage in the CA journey. Each program is crafted by rank holders 
          with focused strategy, live doubt sessions, and exam-oriented preparation.
        </p>

        {/* Course Cards – this is the important part */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              level: "Foundation",
              path: "/foundation",
              desc: "Build strong concepts from Day 1 with simplified explanations and practice from basics.",
              gradient: "from-indigo-600 to-purple-600",
            },
            {
              level: "Intermediate",
              path: "/intermediate",
              desc: "Master complex subjects with in-depth conceptual clarity and advanced problem-solving.",
              gradient: "from-purple-600 to-pink-600",
            },
            {
              level: "Final",
              path: "/final",
              desc: "Rank in Top 100 with proven rank-oriented strategies, case studies & revision plans.",
              gradient: "from-pink-600 to-red-600",
            },
          ].map((course, index) => (
            <div
              key={index}
              className={`group relative perspective-1000 ${cardBg} backdrop-blur-xl border ${borderClass} 
                         rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-4`}
              style={{ transformStyle: "preserve-3d" }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg)";
              }}
            >
              <div className="relative z-10">
                <h3 className={`text-3xl font-extrabold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${course.gradient}`}>
                  {course.level}
                </h3>

                <p className={`${subtleText} mb-8 leading-relaxed text-base`}>
                  {course.desc}
                </p>

                <Link
                  to={course.path}
                  className={`block w-full text-center py-4 px-6 rounded-xl font-bold text-white 
                             bg-gradient-to-r ${course.gradient} 
                             hover:brightness-110 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                >
                  Explore {course.level} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom help section */}
        <div className="mt-16 text-center">
          <p className={`text-lg ${subtleText} mb-6`}>
            Not sure which level is right for you?
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 
                       text-white font-bold text-lg hover:brightness-110 hover:shadow-2xl transition-all duration-300"
          >
            Talk to a Mentor →
          </Link>
        </div>
      </div>
    </div>
  );
}