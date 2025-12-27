// src/components/PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { FaRupeeSign, FaCheckCircle, FaCopy, FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom"; // ← Added this import
import qrCode from "../assets/qrCode.jpeg";
export default function PaymentPage() {
    const location = useLocation(); // Get the current route state

    // Real plan data from router state (passed from previous page)
    const planFromState = location.state?.plan || null;

    // Fallback if no state is passed (for safety)
    const [plan] = useState(
        planFromState || {
            name: "Selected Plan",
            finalPrice: 999,
            originalPrice: 1499,
            coupon: null,
            duration: "1 Month",
        }
    );

    const [utr, setUtr] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [copied, setCopied] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes countdown

    const upiId = "razorpay.me/@caverseofficial";
    // eslint-disable-next-line no-unused-vars
    const upiAmount = plan.finalPrice;

    // Countdown timer
    useEffect(() => {
        if (submitted || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [submitted, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = () => {
        if (!utr.trim()) {
            alert("Please enter UTR / Transaction ID");
            return;
        }

        if (utr.length < 6) {
            alert("Please enter a valid UTR (minimum 6 characters)");
            return;
        }

        setSubmitted(true);

        // Store in localStorage for demo / verification
        const paymentData = {
            planName: plan.name,
            amount: plan.finalPrice,
            utr,
            timestamp: new Date().toISOString(),
        };

        localStorage.setItem("lastPayment", JSON.stringify(paymentData));
        console.log("Payment submitted:", paymentData);
    };

    const handleBack = () => {
        if (
            window.confirm(
                "Are you sure you want to go back? Your payment details will be lost."
            )
        ) {
            window.location.href = "/";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-8 py-16">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                {!submitted ? (
                    <>
                        {/* Header with Back Button */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 relative">
                            <button
                                onClick={handleBack}
                                className="absolute left-4 top-6 text-white hover:bg-white/20 p-2 rounded-full transition-all"
                            >
                                <FaArrowLeft size={20} />
                            </button>
                            <h1 className="text-3xl font-extrabold text-center text-white">
                                Complete Your Payment
                            </h1>
                            {timeLeft > 0 && (
                                <p className="text-center text-white/90 mt-2">
                                    Time remaining: <span className="font-bold">{formatTime(timeLeft)}</span>
                                </p>
                            )}
                        </div>

                        <div className="p-8">
                            {/* Plan Summary Card - Now uses REAL data */}
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-indigo-200">
                                <h2 className="text-2xl font-bold mb-3 text-gray-800">
                                    {plan.name || "Selected Plan"}
                                </h2>
                                <div className="flex items-baseline gap-3 mb-2">
                                    <div className="flex items-center">
                                        <FaRupeeSign className="text-indigo-600 text-xl" />
                                        <span className="font-extrabold text-4xl text-indigo-600">
                                            {plan.finalPrice || "—"}
                                        </span>
                                    </div>
                                    {plan.originalPrice && (
                                        <span className="text-gray-500 line-through text-lg">
                                            ₹{plan.originalPrice}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-4 mt-3">
                                    {plan.coupon && (
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            Coupon: {plan.coupon}
                                        </span>
                                    )}
                                    {plan.duration && (
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            {plan.duration}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Payment Instructions */}
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
                                <p className="text-sm text-yellow-800 font-semibold">
                                    ⚠️ Important: Pay the exact amount of ₹{plan.finalPrice || "—"} only
                                </p>
                            </div>

                            {/* QR Code Section */}
                            <div className="text-center mb-6">
                                <p className="text-xl font-bold mb-4 text-gray-800">
                                    Scan & Pay using UPI
                                </p>

                                <div className="relative inline-block">
                                    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-4 rounded-2xl shadow-lg">
                                        <img
                                            src={qrCode}
                                            alt="UPI QR Code"
                                            className="w-64 h-64 object-contain rounded-xl"
                                        />
                                    </div>
                                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        SCAN ME
                                    </div>
                                </div>
                            </div>

                            {/* UPI ID Copy Section */}
                            <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                <p className="text-sm text-gray-600 mb-2 text-center">
                                    Or pay manually to this UPI ID:
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="font-bold text-lg text-gray-800">{upiId}</span>
                                    <button
                                        onClick={() => copyToClipboard(upiId)}
                                        className="text-indigo-600 hover:text-indigo-700 p-2 hover:bg-indigo-50 rounded-lg transition-all"
                                        title="Copy UPI ID"
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                                {copied && (
                                    <p className="text-green-600 text-sm text-center mt-2">
                                        ✓ Copied to clipboard!
                                    </p>
                                )}
                            </div>

                            {/* UTR Input Section */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Enter Transaction Details
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="UTR / Transaction ID / Reference Number"
                                        value={utr}
                                        onChange={(e) => setUtr(e.target.value.toUpperCase())}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        maxLength={20}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Find this in your payment app after successful payment
                                    </p>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={!utr.trim()}
                                    className={`w-full py-4 font-bold rounded-xl transition-all transform hover:scale-[1.02] ${utr.trim()
                                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg"
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
                                >
                                    {utr.trim() ? "✓ I Have Paid" : "Enter UTR to Continue"}
                                </button>
                            </div>

                            {/* Footer Note */}
                            <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
                                <p className="text-sm text-blue-800">
                                    <strong>📌 Note:</strong> Your access will be activated within 12–24 hours after payment verification. You'll receive a confirmation email.
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Success State */
                    <div className="text-center py-16 px-8">
                        <div className="relative inline-block mb-6">
                            <FaCheckCircle className="text-green-500 text-8xl animate-bounce" />
                            <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        </div>

                        <h2 className="text-4xl font-bold mb-4 text-gray-800">
                            Payment Submitted!
                        </h2>

                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 text-left">
                            <p className="text-lg text-gray-700 mb-4">
                                ✅ We have received your payment details
                            </p>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p><strong>Plan:</strong> {plan.name || "Selected Plan"}</p>
                                <p><strong>Amount:</strong> ₹{plan.finalPrice || "—"}</p>
                                <p><strong>UTR:</strong> {utr}</p>
                                <p><strong>Status:</strong> <span className="text-yellow-600 font-semibold">Pending Verification</span></p>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-8">
                            Our team will verify your payment and activate your access within 12-24 hours.
                            You'll receive a confirmation email at your registered email address.
                        </p>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => window.location.href = "/"}
                                className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                            >
                                Go to Home
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="px-8 py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-50 transition-all"
                            >
                                Print Receipt
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}