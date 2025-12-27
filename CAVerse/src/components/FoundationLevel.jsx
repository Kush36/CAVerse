// src/pages/FoundationLevel.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCheck, FaUsers, FaStar, FaTrophy, FaArrowRight, FaRupeeSign,
  FaClipboardCheck, FaHeadset, FaShieldAlt, FaRobot, FaWhatsapp,
  FaBookOpen, FaClock, FaFire, FaDownload, FaBullseye
} from "react-icons/fa";
import { useTheme } from "../components/ThemeContext";

export default function FoundationLevel() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const bgClass = darkMode ? "bg-black" : "bg-white";
  const textClass = darkMode ? "text-white" : "text-black";
  const cardBg = darkMode ? "bg-white/5" : "bg-black/5";
  const borderClass = darkMode ? "border-white/20" : "border-black/20";
  const subtleText = darkMode ? "text-gray-300" : "text-gray-600";

  const [selectedPlan, setSelectedPlan] = useState("important-questions");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null); // null | {code, discount}
  const [error, setError] = useState("");

  const VALID_COUPON = "CaVerse45";
  const DISCOUNT_PERCENT = 45;

  const plans = [
    // 1. Important Questions Bank – Standalone Course
    {
      id: "important-questions",
      name: "FULL SYLLABUS MOCK",
      price: 1999,
      original: 3999,
      features: [
        "Chapter-wise + Full Syllabus Important Questions PDF",
        "Handpicked from last 12 ICAI attempts (Repeated + Modified)",
        "Snp. Dewstry Sir’s Personal Prediction List for 2025",
        "High-weightage MCQs + Theory Questions",
        "Quick Revision One-Pager Summary per Chapter",
        "Download instantly after payment",
        "Validity: Lifetime access",
        "Perfect for last 30–45 days revision",
      ],
      badge: "Bestseller",
      highlight: true,
      color: "from-orange-500 to-red-600",
    },

    // 2. Normal Plans
    {
      id: "normal-individual",
      name: "UNIT WISE",
      price: 3999,
      original: 7999,
      features: [
        "Individual 3 Chapter - 1Test ",
        "Each chapter: 1 Test + 2 Full Handwritten Notes",
        "ICAI pattern evaluation within 48 hours",
        "Suggested answers + Video solutions",
        "Flexible timing",
        "Validity: Till your attempt",
      ],
      badge: "Most Flexible",
    },
    {
      id: "normal-unit",
      name: "INDIVIDUAL CHAPTER WISE",
      price: 4999,
      original: 8999,
      features: [
        "Unit-wise Tests (3–4 chapters = 1 test)",
        "Each unit: 1 Test + 2 Full Notes",
        "ICAI evaluation + Suggested answers",
        "Flexible scheduling",
        "Validity: Till your attempt",
      ],
      badge: "Balanced",
    },

    // Premium Plans
    {
      id: "premium-top",
      name: "PASS GUARANTEE",
      price: 6999,
      original: 9999,
      features: [
        "Full Chapter-wise Series + Mocks",
        "One-on-One Mentorship (4–6 sessions)",
        "Daily targets & strict follow-ups",
        "Custom planner + Writing practice",
        "WhatsApp + AI Doubt Support",
        "100% Money-Back Guarantee*",
      ],
      badge: "Limited Seats",
      limited: "Only 100 Students",
      recommended: true,
    },
    {
      id: "premium-mid",
      name: "SUCCESS BATCH",
      price: 6999,
      original: 9999,
      features: [
        "Unit-wise Series + 6 Full Mocks",
        "One-on-One Mentorship (6 sessions)",
        "Daily targets & revision strategy",
        "Custom tracker + Writing practice",
        "WhatsApp doubt support",
        "100% Money-Back Guarantee*",
      ],
      badge: "Limited Seats",
      limited: "Only 100 Students",
    },
  ];

  const selected = plans.find(p => p.id === selectedPlan);
  const hasDiscount = appliedCoupon && appliedCoupon.discount > 0;
  const discountAmount = hasDiscount ? Math.round(selected.price * (DISCOUNT_PERCENT / 100)) : 0;
  const finalPrice = selected.price - discountAmount;

  const handleApplyCoupon = () => {
    const code = couponCode.trim();
    if (code.toLowerCase() === VALID_COUPON.toLowerCase()) {
      setAppliedCoupon({ code: VALID_COUPON, discount: DISCOUNT_PERCENT });
      setError("");
    } else {
      setAppliedCoupon(null);
      setError("Invalid coupon code. Try CaVerse45");
    }
  };

  const handleEnroll = () => {
    navigate("/payment", {
      state: {
        plan: {
          ...selected,
          finalPrice,
          originalPrice: selected.price,
          discountAmount,
          discountPercent: hasDiscount ? DISCOUNT_PERCENT : 0,
          coupon: appliedCoupon?.code || null,
        }
      }
    });
  };

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-500 pb-24`}>
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            CA Foundation 2025
          </h1>
          <p className="text-2xl mb-8">Clear with Confidence • Rank with Strategy</p>
        </div>
      </section>

      {/* Coupon Section */}
      <section className="py-12 px-6 bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Unlock 45% OFF!</h2>
          <p className="text-lg md:text-xl mb-8">
            Use code <strong className="text-yellow-400 font-bold">CaVerse45</strong> for instant 45% discount
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className={`flex-1 px-6 py-4 rounded-full border ${borderClass} focus:outline-none focus:ring-2 focus:ring-purple-500 ${cardBg} text-lg`}
            />
            <button
              onClick={handleApplyCoupon}
              className="px-10 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:scale-105 transition-all shadow-lg"
            >
              Apply Coupon
            </button>
          </div>

          {error && <p className="text-red-400 mt-4 text-lg">{error}</p>}
          {hasDiscount && (
            <p className="text-green-400 mt-8 text-xl md:text-2xl font-bold animate-pulse">
              🎉 45% OFF Applied! You save ₹{discountAmount.toLocaleString()}
            </p>
          )}
        </div>
      </section>

      {/* Highlight: Important Questions Course */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-600/10 via-red-600/10 to-pink-600/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-4 mb-8">
            <FaFire className="text-6xl text-orange-500 animate-pulse" />
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              #1 Selling Course: Important Questions Bank
            </h2>
            <FaFire className="text-6xl text-red-500 animate-pulse" />
          </div>
          <p className="text-xl mb-10 max-w-4xl mx-auto">
            90%+ questions come from this list • Used by 2024 Rankers • Instant download
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.filter(p => p.id === "important-questions").map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-10 bg-gradient-to-br ${plan.color} text-white shadow-2xl ring-4 ring-white/30`}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-8 py-3 rounded-full bg-white text-orange-600 font-bold text-lg shadow-xl">
                  {plan.badge} • ₹{plan.price}
                </div>
                <h3 className="text-3xl font-extrabold mt-8 mb-6">{plan.name}</h3>
                <div className="text-6xl font-bold mb-4">
                  {hasDiscount ? (
                    <>
                      <span className="line-through opacity-70 text-xl">₹{plan.price}</span><br />
                      ₹{Math.round(plan.price * (1 - DISCOUNT_PERCENT / 100))}
                    </>
                  ) : (
                    `₹${plan.price}`
                  )}
                </div>
                <p className="text-2xl line-through opacity-80">₹{plan.original}</p>
                <p className="text-lg font-bold mt-2">Save ₹{(plan.original - plan.price)}</p>

                <ul className="space-y-4 my-8 text-left">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheck className="text-2xl mt-1 flex-shrink-0" />
                      <span className="text-lg">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className="w-full py-5 rounded-xl bg-white text-orange-600 font-extrabold text-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-3"
                >
                  <FaDownload /> Download Instantly
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Money-Back Notice */}
      <section className="py-12 px-6 bg-red-600/10 border-t-4 border-red-500">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Premium Plan: 100% Money-Back Guarantee</h2>
          <p className="text-lg">Conditions: Attempt all tests • Score ≥15 marks in each</p>
        </div>
      </section>

      {/* All Other Plans */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Other Available Courses
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {plans.filter(p => p.id !== "important-questions").map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 ${cardBg} backdrop-blur border ${borderClass} transition-all hover:scale-105 hover:shadow-2xl ${
                  selectedPlan === plan.id ? "ring-4 ring-purple-600" : ""
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 whitespace-nowrap">
                    {plan.badge} {plan.limited && `• ${plan.limited}`}
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <FaRupeeSign className="text-4xl" />
                    <span className="text-6xl font-extrabold">
                      {hasDiscount ? Math.round(plan.price * (1 - DISCOUNT_PERCENT / 100)) : plan.price}
                    </span>
                  </div>
                  <p className="text-xl line-through text-gray-500">₹{plan.original.toLocaleString("en-IN")}</p>
                  <p className="text-green-400 font-bold text-lg">
                    Save ₹{(plan.original - (hasDiscount ? Math.round(plan.price * (1 - DISCOUNT_PERCENT / 100)) : plan.price)).toLocaleString("en-IN")}
                  </p>
                </div>

                <ul className="space-y-4 mb-10 text-left">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheck className="text-green-400 mt-1 flex-shrink-0" />
                      <span className={subtleText}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    selectedPlan === plan.id
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-white/20 hover:bg-white/30 border border-white/40"
                  }`}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with Dynamic Price */}
      <section className="py-20 text-center bg-gradient-to-t from-purple-900/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            Ready to Start Your CA Foundation Journey?
          </h2>

          <div className="flex flex-col items-center gap-6">
            <div className="text-2xl font-bold">
              Selected: <span className="text-purple-400">{selected?.name}</span>
            </div>

            <div className="text-3xl font-bold">
              Final Price:{" "}
              {hasDiscount ? (
                <>
                  <span className="line-through text-gray-500 opacity-80 text-2xl">₹{selected?.price.toLocaleString()}</span>{" "}
                  <span className="text-green-400">₹{finalPrice.toLocaleString()}</span>
                  <span className="text-green-400 ml-3 text-xl">(-45% OFF)</span>
                </>
              ) : (
                <span>₹{selected?.price.toLocaleString()}</span>
              )}
            </div>

            <button
              onClick={handleEnroll}
              className="inline-flex items-center gap-4 px-16 py-6 rounded-full text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl hover:scale-110 transition-all"
            >
              Enroll Now & Pay ₹{finalPrice.toLocaleString()} <FaArrowRight className="text-3xl" />
            </button>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={handleEnroll}
          className="px-10 py-5 rounded-full font-bold text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl hover:scale-110 transition-all flex items-center gap-3"
        >
          <FaRupeeSign /> Pay ₹{finalPrice.toLocaleString()} Now
          {hasDiscount && <span className="text-yellow-300 text-sm ml-2">(45% OFF Applied)</span>}
        </button>
      </div>
    </div>
  );
}