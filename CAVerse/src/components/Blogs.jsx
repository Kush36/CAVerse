// src/components/Blogs.jsx
import { Link } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";

// Sample blog data (unchanged)
const blogPosts = [
  {
    id: 1,
    title: "How to Clear CA Foundation in First Attempt: Complete Strategy 2026",
    excerpt:
      "A step-by-step guide by AIR-12 holder: study timetable, best resources, common mistakes to avoid, and how to score 250+ in Foundation.",
    date: "December 15, 2025",
    author: "Priya Sharma",
    authorRole: "CA Final AIR-27",
    slug: "ca-foundation-first-attempt-strategy",
    readTime: "8 min",
    category: "Strategy",
  },
  {
    id: 2,
    title: "CA Intermediate May 2026: Last 30 Days Revision Plan That Works",
    excerpt:
      "Intensive revision strategy used by toppers: subject-wise weightage, quick notes, mock test schedule, and how to handle pressure.",
    date: "December 10, 2025",
    author: "Rahul Verma",
    authorRole: "CA Inter AIR-12",
    slug: "ca-intermediate-last-30-days-plan",
    readTime: "6 min",
    category: "Revision",
  },
  {
    id: 3,
    title: "Why 97% of Our Students Clear CA Final in First Attempt",
    excerpt:
      "Real case studies, our mentorship secrets, importance of doubt clearing sessions, and how rank-oriented preparation makes the difference.",
    date: "December 5, 2025",
    author: "Ananya Singh",
    authorRole: "CA Foundation Topper & Mentor",
    slug: "why-97-percent-clear-first-attempt",
    readTime: "10 min",
    category: "Success Stories",
  },
];

export default function Blogs() {
  const { darkMode } = useTheme();

  const bgClass = darkMode
    ? "bg-gradient-to-br from-gray-950 via-indigo-950 to-black"
    : "bg-gradient-to-br from-gray-50 via-purple-50 to-white";

  const cardBg = darkMode ? "bg-white/5 backdrop-blur-xl" : "bg-white/70 backdrop-blur-md";
  const borderClass = darkMode ? "border-white/10" : "border-purple-200/50";
  const textClass = darkMode ? "text-gray-200" : "text-gray-800";
  const subtleText = darkMode ? "text-gray-400" : "text-gray-600";
  const accent = darkMode ? "from-purple-400 to-pink-400" : "from-indigo-600 to-purple-600";

  return (
    <div className={`min-h-screen pt-28 pb-20 px-6 transition-all duration-500 ${bgClass} ${textClass}`}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            <span className={`bg-gradient-to-r ${accent} bg-clip-text text-transparent`}>
              CaVerse Insights
            </span>
          </h1>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${subtleText}`}>
            Latest strategies, rank holder secrets, exam tips & success stories — straight from toppers & mentors.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className={`group relative ${cardBg} border ${borderClass} rounded-3xl overflow-hidden shadow-xl 
                         transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 
                         hover:-translate-y-4 backdrop-blur-sm`}
            >
              {/* Category Badge */}
              <span className="absolute top-6 left-6 z-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                {post.category}
              </span>

              {/* Content (no image) */}
              <div className="p-8">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-sm mb-5">
                  <span className="font-medium text-purple-400">{post.author}</span>
                  <span className={subtleText}>•</span>
                  <span className={subtleText}>{post.date}</span>
                  <span className={subtleText}>•</span>
                  <span className="flex items-center gap-1 text-purple-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                      <path d="M10 5a1 1 0 011 1v4a1 1 0 01-1 1H7a1 1 0 110-2h2V6a1 1 0 011-1z" />
                    </svg>
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold mb-4 line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className={`${subtleText} mb-6 line-clamp-4 leading-relaxed`}>
                  {post.excerpt}
                </p>

                {/* Author Role & Read More */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-purple-400">{post.authorRole}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className={`inline-flex items-center font-semibold text-purple-400 hover:text-purple-300 transition-all group-hover:translate-x-2`}
                  >
                    Read Full Article →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Attractive CTA Section */}
        <div className="mt-20 text-center">
          <div className={`inline-block p-10 rounded-3xl ${cardBg} border ${borderClass} backdrop-blur-xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-500`}>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Want Exclusive CA Tips & Updates?
            </h3>
            <p className={`text-lg md:text-xl ${subtleText} mb-8 max-w-2xl mx-auto`}>
              Join thousands of aspirants receiving rank-holder strategies, mock alerts, and mentorship secrets directly.
            </p>
            <Link
              to="/signup"
              className="inline-block px-12 py-5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold text-xl hover:brightness-110 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Join CaVerse Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}