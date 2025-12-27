/* eslint-disable no-unused-vars */
// src/pages/About.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaGraduationCap,
  FaBriefcase,
  FaChartLine,
  FaFileAlt,
  FaUsers,
  FaTrophy,
  FaClock,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useTheme } from "../components/ThemeContext";
import "../About.css";

// === Animated Counter (No external deps) ===
const AnimatedCounter = ({ end, suffix = "", duration = 1800 }) => {
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

// === Collapsible Section Component ===
const Collapsible = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/20 dark:border-black/20 pb-6 mb-6 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left group transition-all duration-300 hover:text-indigo-400"
      >
        <div className="flex items-center gap-3">
          <Icon className="text-2xl text-indigo-500" />
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div className="transition-transform duration-300 group-hover:scale-110">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </button>
      <div
        className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="pl-9 space-y-2 text-gray-600 dark:text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function About() {
  const { darkMode } = useTheme();

  const bgClass = darkMode ? "bg-black" : "bg-white";
  const textClass = darkMode ? "text-white" : "text-black";
  const cardBg = darkMode ? "bg-white/2" : "bg-black/2";
  const borderClass = darkMode ? "border-white/20" : "border-black/20";
  const subtleText = darkMode ? "text-gray-300" : "text-gray-600";

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${bgClass} ${textClass} transition-colors duration-500 scroll-smooth`}
    >
      {/* Animated Background */}
      <div className={`animated-bg ${darkMode ? "dark" : "light"}`} />

      {/* Floating Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400/30 to-purple-400/30 animate-pulse"
            style={{
              left: `${15 + i * 18}%`,
              animationDelay: `${i * 0.7}s`,
              animation: `float ${10 + i * 2}s linear infinite`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <div
          className={`p-10 rounded-3xl ${cardBg} backdrop-blur-xl shadow-2xl border ${borderClass} hover:shadow-3xl transition-all duration-500`}
        >
          {/* Hero Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              About CaVerse & CA Program
            </h1>
            <p className={`text-lg ${subtleText} max-w-3xl mx-auto`}>
              Empowering the next generation of Chartered Accountants with world-class mentorship, resources & community.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-center">
            {[
              { Icon: FaUsers, label: "Students", end: 1200, suffix: "+" },
              { Icon: FaTrophy, label: "Rank Holders", end: 85, suffix: "+" },
              { Icon: FaClock, label: "Hours Mentored", end: 4500, suffix: "+" },
              { Icon: FaCheckCircle, label: "Success Rate", end: 97, suffix: "%" },
            ].map((s, i) => (
              <div key={i} className="space-y-2">
                <s.Icon className="mx-auto text-3xl text-indigo-500" />
                <div className="text-2xl font-bold">
                  <AnimatedCounter end={s.end} suffix={s.suffix} />
                </div>
                <p className={`text-sm ${subtleText}`}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-6">
            <Collapsible title="What is CA?" icon={FaGraduationCap} defaultOpen>
              <p>
                Chartered Accountancy (CA) is one of India’s most prestigious and toughest professional courses in accounting, finance, taxation, and law.
              </p>
              <p className="mt-2">
                <strong>In simple words:</strong> A CA is the <span className="text-indigo-400 font-semibold">“Financial Doctor”</span> every company needs.
              </p>
            </Collapsible>

            <Collapsible title="Who Can Do CA?" icon={FaUsers}>
              <ul className="list-disc list-inside space-y-1">
                <li>After Class 12 (Foundation Route) or after Graduation (Direct Entry)</li>
                <li>Commerce Graduates: 55% | Non-Commerce: 60%</li>
                <li>No age limit. Anyone with consistency and discipline can pursue CA.</li>
              </ul>
            </Collapsible>

            <Collapsible title="CA Course Structure" icon={FaChartLine}>
              <ul className="space-y-3">
                <li>
                  <strong className="text-indigo-400">CA Foundation:</strong> 6 months — Accounts, Law, Maths, Economics
                </li>
                <li>
                  <strong className="text-purple-400">CA Intermediate:</strong> 1.5 years — Tax, Accounts, Law, Audit, FM & SM
                </li>
                <li>
                  <strong className="text-pink-400">CA Final:</strong> 2 years (with Articleship) — Advanced laws, audit, finance, costing
                </li>
              </ul>
            </Collapsible>

            <Collapsible title="Articleship (Practical Training)" icon={FaBriefcase}>
              <div className="space-y-2">
                <p><strong>Duration:</strong> 3 years (after clearing CA Inter)</p>
                <p><strong>Work:</strong> Auditing, GST, financial statements, real business cases</p>
                <p><strong>Stipend:</strong> ₹5,000 – ₹15,000/month</p>
                <p className="text-green-400 font-medium">Articleship = Real-world learning + Professional grooming</p>
              </div>
            </Collapsible>

            <Collapsible title="Career Scope After CA" icon={FaTrophy}>
              <div className="space-y-2">
                <p>Work in: Big 4, MNCs, Startups, Govt, or start your own firm</p>
                <p><strong>Roles:</strong> Auditor, Tax Consultant, CFO, Financial Analyst</p>
                <p className="text-yellow-400 font-semibold">
                  Starting Salary: ₹7–12 LPA (can rise to ₹25–30 LPA+)
                </p>
              </div>
            </Collapsible>

            <Collapsible title="CA Test Series by CaVerse" icon={FaFileAlt}>
              <p>Practice is key in CA exams. Our test series helps you:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Attempt real ICAI pattern papers</li>
                <li>Get expert-evaluated feedback</li>
                <li>Improve time management & accuracy</li>
                <li>Identify weak areas early</li>
              </ul>
            </Collapsible>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <a
              href="/signup"
              className="inline-block px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Your CA Journey Today
            </a>
          </div>
        </div>
      </div>

      {/* Static Footer – now flows with content */}
      <footer className="py-20 border-t border-gray-100 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">

          {/* Main Box — Background BACK & PREMIUM */}
          <div className="inline-block p-8 rounded-3xl  dark:bg-white/8 backdrop-blur-xl shadow-2xl ring-1 ring-amber-200/40 dark:ring-amber-700/20 border border-amber-100 dark:border-amber-900/30">

            <h3 className="text-3xl font-black text-gray-900 dark:text-black mb-3 tracking-tight">
              Join the CaVerse Community
            </h3>

            <p className="text-base text-gray-600 dark:text-black-300 mb-8 max-w-md mx-auto leading-relaxed">
              Exclusive updates, mock alerts, and mentor slots — delivered straight to you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">

              {/* CTA Button */}
              <a
                href="/signup"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 
                     dark:text-black font-bold text-lg shadow-xl hover:shadow-amber-500/50 
                     transform hover:scale-105 transition-all duration-300"
              >
                Get Early Access
              </a>

              {/* Social Icons */}
              <div className="flex gap-6">
                {[
                  {
                    Icon: FaFacebook,
                    url: "https://www.facebook.com/yourpage",
                    color: "text-indigo-600 hover:text-indigo-800",
                    label: "Facebook",
                  },
                  {
                    Icon: FaInstagram,
                    url: "https://www.instagram.com/officialcaverse?igsh=eHh6bWltaXMzbTdy",
                    color: "text-pink-600 hover:text-pink-800",
                    label: "Instagram",
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

          {/* Clean Copyright */}
          <div className="mt-12 text-sm font-medium text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} <span className="font-bold text-amber-700 dark:text-amber-500">CaVerse</span>. Crafted with excellence.
          </div>

        </div>
      </footer>
    </div>
  );
}