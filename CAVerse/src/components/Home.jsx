import React, { useEffect, useRef, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaCheckCircle,
  FaUsers,
  FaTrophy,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import "../About.css";
import BatchesImage from '../assets/image.png';
import FacultyImage from '../assets/image1.png';
import Logo from "../assets/image2.png"
import GetStartedBg from '../assets/logo.jpg';

// === Animated Counter Component ===
const AnimatedCounter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 30);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function Home() {
  const { darkMode } = useTheme();

  // Dynamic theme classes
  const bgClass = darkMode
    ? "bg-black"
    : "bg-gradient-to-br from-[#f5f7fa] via-[#eae8ff] to-[#f7f2ff]";

  const textClass = darkMode ? "text-white" : "text-black";
  const cardBg = darkMode ? "bg-white/10" : "bg-[#f7f2ff]/30";
  const borderClass = darkMode ? "border-white/20" : "border-black/20";
  const subtleText = darkMode ? "text-gray-300" : "text-gray-600";
  const glowClass = darkMode ? "from-purple-500/20 to-pink-500/20" : "from-indigo-400/20 to-purple-400/20";

  // Slider State & Data
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Achieve Your CA Aim With Us!",
      subtitle: "CA BATCHES FOR FOUNDATION , INTERMEDIATE, FINAL",
      buttonText: "EXPLORE BATCHES!",
      route: "/courses",           // ← Goes to all courses page
      image: BatchesImage,
    },
    {
      title: "Bharat’s Trusted & Affordable",
      subtitle: "Power Packed CA Preparation Created by Expert Faculty",
      buttonText: "JOIN NOW",
      route: "/signup",            // ← Direct to signup (most common CTA)
      image: FacultyImage,
    },
    {
      title: "Results That Speak Louder",
      subtitle: "Multiple Top Ranks in CA Exam",
      buttonText: "SEE RESULTS",
      route: "/results",           // ← Assuming you have a results page
      image: Logo,
    },
    {
      title: "Exclusive Limited Time Offer",
      subtitle: "Up to 45% OFF + MoneyBack Guarantee",
      buttonText: "GRAB OFFER",
      route: "/signup?offer=true", // ← Signup with offer tracking (optional query)
      image: Logo,
    },
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Testimonial carousel
  const testimonials = [
    {
      quote: "Cleared CA Final in first attempt with AIR 27. CaVerse mentorship was the game changer.",
      name: "Priya Sharma",
      title: "CA Final Rank 27",
    },
    {
      quote: "From zero to AIR 12 in Intermediate. The live doubt sessions are gold.",
      name: "Rahul Verma",
      title: "CA Inter Rank 12",
    },
    {
      quote: "Best decision for Foundation. Passed with 78% in first attempt.",
      name: "Ananya Singh",
      title: "CA Foundation Topper",
    },
  ];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((c) => (c + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`relative min-h-screen overflow-hidden pt-7 md:pt-8 ${bgClass} ${textClass} transition-colors duration-500`}
    >
      {/* Animated Background */}
      <div className={`animated-bg ${darkMode ? "dark" : "light"}`} />

      {/* Floating Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${glowClass} animate-pulse`}
            style={{
              left: `${15 + i * 12}%`,
              animationDelay: `${i * 0.8}s`,
              animation: `float ${12 + i}s linear infinite`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
              circle at 20% 50%,
              rgba(120, 119, 198, 0.1),
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 80%,
              rgba(162, 155, 254, 0.1),
              transparent 50%
            );
          animation: bgShift 20s ease-in-out infinite;
        }

        @keyframes bgShift {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      {/* ======================= HERO SECTION ======================= */}
      <section className="relative z-10 pt-10 md:pt-20 pb-20 px-6 text-center">
        <div
          className={`max-w-5xl mx-auto p-8 md:p-12 rounded-3xl ${cardBg} backdrop-blur-xl shadow-2xl border ${borderClass} hover:shadow-3xl transition-all duration-500`}
        >
          {/* 97% Headline */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-4 md:gap-8 mb-8">
            <div className="text-7xl md:text-9xl lg:text-[10rem] font-black bg-gradient-to-br from-green-400 to-emerald-600 bg-clip-text text-transparent leading-none drop-shadow-2xl">
              97
              <span className="text-5xl md:text-7xl align-top">%</span>
            </div>
            <div className="text-center md:text-left">
              <p
                className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"
                  }`}
              >
                First Attempt Success
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-green-500">
                <div className="flex items-center gap-2 text-base md:text-lg">
                  <FaTrophy /> <span>Multiple AIR Rank Holders</span>
                </div>
                <div className="flex items-center gap-2 text-base md:text-lg">
                  <FaUsers /> <span>12,000+ Students Mentored</span>
                </div>
              </div>
            </div>
          </div>

          <p
            className={`text-xl md:text-2xl font-semibold mb-6 ${darkMode ? "text-gray-200" : "text-gray-800"
              } max-w-3xl mx-auto`}
          >
            Join India's Most Trusted CA Mentorship Program
          </p>

          <p
            className={`text-base md:text-lg mb-10 ${subtleText} max-w-3xl mx-auto leading-relaxed`}
          >
            Crack CA Foundation, Intermediate & Final in your <b>first attempt</b> with
            rank-holder mentors, 24/7 live doubts, and exam-focused strategy.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-8">
            {/* Start Free Trial - goes to signup/trial page */}
            <Link
              to="/signup"                    // ← change to your actual trial/signup route
              className="group relative px-12 py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-2xl hover:scale-105 hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden inline-block text-center"
            >
              <span className="relative z-10">Start Free Trial</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            {/* View Courses - goes to courses page */}
            <Link
              to="/courses"                   // ← change to your actual courses route
              className={`px-12 py-5 rounded-2xl font-bold text-xl border-2 ${darkMode ? "border-white/50 hover:bg-white/10" : "border-gray-700 hover:bg-gray-100"
                } transition-all duration-300 hover:scale-105 inline-block text-center`}
            >
              View Courses
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 text-sm md:text-base">
            {["Big 4 CA Mentors", "AIR Rank Holders", "Exam-Focused Notes", "24×7 Doubt Support"].map((t) => (
              <div
                key={t}
                className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 hover:border-green-400/50 transition-all"
              >
                <FaCheckCircle className="text-green-500 text-lg md:text-xl" />
                <span className={subtleText}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= SLIDER SECTION ======================= */}
      <section className="relative z-10 py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-purple-500/30 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slider Content */}
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="min-w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 relative"
                >
                  {/* Left Text Content */}
                  <div className="text-center md:text-left max-w-lg">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
                      {slide.subtitle}
                    </p>
                    <button className="px-10 py-4 bg-white text-indigo-900 font-bold text-lg rounded-full shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                      {slide.buttonText} →
                    </button>
                  </div>

                  {/* Right Image */}
                  <div className="mt-8 md:mt-0">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-64 md:w-80 h-64 md:h-80 object-cover rounded-2xl shadow-2xl border-4 border-white/20"
                    />
                  </div>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-white w-10" : "bg-white/40 hover:bg-white/70"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ======================= NEW GET STARTED SECTION ======================= */}
      <section className="relative z-10 py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={GetStartedBg}
            alt="Students celebrating success"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
            INDIA'S MOST RELIABLE
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              CA TEST SERIES
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-3xl text-white/90 font-medium mb-12 max-w-3xl mx-auto">
            Practice Before You Appear – Join Thousands of Successful CS Aspirants Today!
          </p>

          {/* Stats Overlay - Eye-catching numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mb-16">
            <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/30">
              <div className="text-5xl md:text-6xl font-black text-cyan-400 mb-2">
                <AnimatedCounter end={45000} suffix="+" />
              </div>
              <p className="text-xl text-white/90">Students Trained</p>
            </div>

            <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/30">
              <div className="text-5xl md:text-6xl font-black text-cyan-400 mb-2">
                <AnimatedCounter end={87} suffix="%" />
              </div>
              <p className="text-xl text-white/90">Passing Ratio</p>
            </div>

            <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/30">
              <div className="text-5xl md:text-6xl font-black text-cyan-400 mb-2">
                <AnimatedCounter end={120} suffix="+" />
              </div>
              <p className="text-xl text-white/90">Rankers in Top 100</p>
            </div>
          </div>

          {/* Get Started Button */}
          <Link to="/signup" className="inline-block">
            <button className="group relative px-16 py-6 text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Get Started Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>

          {/* Small motivational text */}
          <p className="mt-10 text-lg md:text-xl text-white/70 italic">
            Practice Before You Appear – Your Success Journey Starts Here!
          </p>
        </div>
      </section>


      {/* ======================= HOW ARE WE DIFFERENT? TABLE ======================= */}
      <section className="relative z-10 py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
            How are we Different?
          </h2>

          <div className="overflow-x-auto">
            <table className={`w-full border-collapse rounded-2xl overflow-hidden shadow-2xl ${cardBg} backdrop-blur-xl border ${borderClass}`}>
              <thead>
                <tr className="bg-gradient-to-r from-indigo-900/80 to-purple-900/80">
                  <th className="py-6 px-6 text-left text-white text-xl md:text-2xl font-bold">
                    Features
                  </th>
                  <th className="py-6 px-6 text-center text-white text-xl md:text-2xl font-bold border-l border-white/20">
                    CaVerse
                  </th>
                  <th className="py-6 px-6 text-center text-white text-xl md:text-2xl font-bold border-l border-white/20">
                    Others
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                {[
                  { feature: "Structured Notes", we: true, others: true },
                  { feature: "Accounts, Law & Tax by Same Expert Faculty", we: true, others: false },
                  { feature: "Quantitative Techniques & Reasoning", we: true, others: false },
                  { feature: "1:1 Live Answer Sheet Evaluation", we: true, others: false },
                  { feature: "Detailed RTP & MTP Solutions with Video Explanations", we: true, others: false },
                  { feature: "ICAI Past Papers with Expert Video Solutions", we: true, others: false },
                  { feature: "Live Practice Sessions & 1:1 Doubt Solving", we: true, others: false },
                  { feature: "Case Study Based Full Mock Tests Series", we: true, others: false },
                  { feature: "Comprehensive Study Material (Notes + MCQs + Case Studies)", we: true, others: false },
                ].map((item, index) => (
                  <tr
                    key={index}
                    // eslint-disable-next-line no-constant-condition
                    className={`border-t border-white ${'NULL' ? 'bg-black' : ''} hover:bg-white/10 transition-colors`}
                  >
                    <td className="py-5 px-6 text-lg font-medium">
                      {item.feature}
                    </td>
                    <td className="py-5 px-6 text-center border-l border-white/20">
                      {item.we ? (
                        <FaCheckCircle className="inline text-green-400 text-3xl" />
                      ) : (
                        <span className="text-red-500 text-3xl">×</span>
                      )}
                    </td>
                    <td className="py-5 px-6 text-center border-l border-white/20">
                      {item.others ? (
                        <FaCheckCircle className="inline text-green-400 text-3xl opacity-60" />
                      ) : (
                        <span className="text-red-500 text-3xl">×</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Perks */}
          <div className="mt-10 text-center">
            <p className={`text-xl md:text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
              Additional Perks:{" "}
              <span className="text-green-400 font-bold">
                Job/Internship Updates • Dedicated TA Support • Personal Mentorship Sessions • Regular Progress Tracking
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ======================= LIVE MENTOR BADGE ======================= */}
      <div className="fixed top-40 right-6 z-50  md:block">
        <div className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-700 text-white px-5 py-3 rounded-full shadow-2xl animate-pulse hover:scale-105 transition-transform cursor-pointer">
          <div className="relative">
            <div className="w-3 h-3 bg-white rounded-full" />
            <div className="absolute inset-0 w-3 h-3 bg-white rounded-full animate-ping" />
          </div>
          <span className="font-bold text-sm">
            {Math.floor(Math.random() * 8) + 35} User Live Now
          </span>
        </div>
      </div>

      {/* ======================= STATS SECTION ======================= */}
      {/* <section className="relative z-10 py-16 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto text-center">
          {[
            { Icon: FaUsers, label: "Students", end: 12000, suffix: "+", color: "text-blue-500" },
            { Icon: FaTrophy, label: "Rank Holders", end: 850, suffix: "+", color: "text-yellow-500" },
            { Icon: FaClock, label: "Hours Mentored", end: 45000, suffix: "+", color: "text-purple-500" },
            { Icon: FaCheckCircle, label: "Success Rate", end: 97, suffix: "%", color: "text-green-500" },
          ].map((s, i) => (
            <div
              key={i}
              className={`group ${cardBg} backdrop-blur-md rounded-2xl p-6 border ${borderClass} hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <s.Icon
                className={`mx-auto text-4xl md:text-5xl ${s.color} mb-3 group-hover:scale-110 transition-transform`}
              />
              <div className="text-3xl md:text-4xl font-black mb-2">
                <AnimatedCounter end={s.end} suffix={s.suffix} />
              </div>
              <p className={`text-xs md:text-sm ${subtleText} font-medium`}>{s.label}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* ======================= LEVEL WISE COURSES ======================= */}
      <section className="relative z-10 py-20 px-6">
        <h2 className="text-4xl md:text-6xl font-black mb-14 text-center bg-gradient-to-r from-amber-500 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg hover:scale-105 transition-transform cursor-pointer">
          Level Wise Courses
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              level: "Foundation",
              path: "/foundation",
              desc: "Build strong concepts from Day 1",
              gradient: "from-indigo-600 to-purple-600",
              icon: "🎯",
            },
            {
              level: "Intermediate",
              path: "/intermediate",
              desc: "Master complex subjects with confidence",
              gradient: "from-purple-600 to-pink-600",
              icon: "🚀",
            },
            {
              level: "Final",
              path: "/final",
              desc: "Rank in Top 100 with proven strategies",
              gradient: "from-pink-600 to-red-600",
              icon: "🏆",
            },
          ].map((p, i) => (
            <div
              key={i}
              className={`group ${cardBg} backdrop-blur-xl border ${borderClass} rounded-3xl p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 cursor-pointer`}
            >
              <div className="relative z-10">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{p.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{p.level} Level</h3>
                <p className={`${subtleText} mb-6 leading-relaxed`}>{p.desc}</p>

                <Link to={p.path}>
                  <button
                    className={`w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r ${p.gradient}`}
                  >
                    Enroll Now →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================= FEATURES ======================= */}
      <section className="relative z-10 py-20 px-6">
        <h2 className="text-center text-4xl md:text-6xl font-black mb-14 bg-gradient-to-r from-amber-500 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
          Why Toppers Choose CaVerse
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Expert Mentors",
              desc: "Learn from top CAs with real-world experience.",
              icon: "👨‍🏫",
            },
            {
              title: "Interactive Learning",
              desc: "Engaging classes, webinars, and practice sessions.",
              icon: "💡",
            },
            {
              title: "Community Support",
              desc: "Collaborate with peers, share resources, and grow.",
              icon: "🤝",
            },
          ].map((f, i) => (
            <div
              key={i}
              className={`group p-8 rounded-2xl ${cardBg} backdrop-blur-md border ${borderClass} text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 cursor-pointer`}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-lg">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className={`${subtleText} leading-relaxed`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================= TESTIMONIAL CAROUSEL ======================= */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-indigo-600/10 to-purple-600/10">
        <h2 className="text-center text-4xl md:text-6xl font-black mb-14 bg-gradient-to-r from-amber-500 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
          What Students Say
        </h2>
        <div className="max-w-4xl mx-auto">
          <div
            className={`p-10 rounded-3xl ${cardBg} backdrop-blur-xl border ${borderClass} text-center shadow-2xl hover:shadow-3xl transition-all duration-500`}
          >
            <div className="text-6xl mb-6">💬</div>
            <p className="text-lg md:text-xl italic mb-6 leading-relaxed">
              "{testimonials[currentTestimonial].quote}"
            </p>
            <p className="font-bold text-lg">— {testimonials[currentTestimonial].name}</p>
            <p className={`text-sm ${subtleText} mt-1`}>
              {testimonials[currentTestimonial].title}
            </p>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === currentTestimonial ? "bg-indigo-500 w-8" : "bg-gray-400 w-2 hover:bg-gray-500"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ======================= STICKY CTA ======================= */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-100">
        <Link
          to="/signup"
          className="group relative px-3 py-2 rounded-full font-bold text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition-all overflow-hidden"
        >
          <span className="relative z-10">Start Free Trial Now</span>

        </Link>
      </div>

      {/* ======================= FOOTER ======================= */}
      <footer
        className={`relative z-10 py-20 border-t ${darkMode ? "border-white/10" : "border-gray-200"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div
            className={`inline-block p-8 md:p-12 rounded-3xl ${cardBg} backdrop-blur-xl shadow-2xl border ${borderClass} hover:shadow-3xl transition-all duration-500`}
          >
            <h3
              className={`text-3xl md:text-4xl font-black mb-4 tracking-tight ${darkMode ? "text-white" : "text-gray-900"
                }`}
            >
              Join the CaVerse Community
            </h3>
            <p className={`text-base md:text-lg ${subtleText} mb-8 max-w-md mx-auto leading-relaxed`}>
              Exclusive updates, mock alerts, and mentor slots — delivered straight to you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <Link
                to='/signup'
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg shadow-xl hover:shadow-amber-500/50 transform hover:scale-105 transition-all duration-300">
                Get Early Access
              </Link>
              <div className="flex gap-6">
                {[
                  {
                    Icon: FaInstagram,
                    url: "https://www.instagram.com/officialcaverse?igsh=eHh6bWltaXMzbTdy",
                    color: "text-pink-600 hover:text-pink-800",
                    label: "Instagram",
                  },
                  {
                    Icon: FaFacebook,
                    url: "https://www.facebook.com/yourpage",
                    color: "text-indigo-600 hover:text-indigo-800",
                    label: "Facebook",
                  }, 
                  {
                    Icon: FaTwitter,
                    url: "https://twitter.com/yourpage",
                    color: "text-sky-500 hover:text-sky-700",
                    label: "Twitter",
                  },
                  {
                    Icon: FaLinkedin,
                    url: "https://www.linkedin.com/company/yourpage",
                    color: "text-violet-700 hover:text-violet-900",
                    label: "LinkedIn",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`${social.color} transform hover:scale-125 transition-all duration-300`}
                  >
                    <social.Icon size={28} />
                  </a>
                ))}
              </div>

            </div>
          </div>
          <div className={`mt-12 text-sm font-medium ${subtleText}`}>
            © {new Date().getFullYear()}{" "}
            <span className="font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              CaVerse
            </span>
            . Crafted with excellence.
          </div>
        </div>
      </footer>
    </div>
  );
}