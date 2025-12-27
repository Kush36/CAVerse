/* eslint-disable no-unused-vars */
// src/pages/Contact.jsx
import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useTheme } from "../components/ThemeContext";
import "../About.css";

function Contact() {
  const { darkMode } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);

  const handleSubmit = async () => {
    // Prevent empty submissions
    if (!name || !email || !message) {
      setToastType("error");
      setToastMessage("Please fill in all fields");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      return;
    }

    setIsSubmitting(true);

    try {
      // Using Web3Forms - Free service, no signup needed!
      // Get your access key from https://web3forms.com
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'b4f5e5c7-cce3-48f1-8c7d-a632fb2ba1f9', // Get from https://web3forms.com
          name: name,
          email: email,
          message: message,
          subject: `New Contact Form Message from ${name}`,
          from_name: 'CaVerse Contact Form',
          to_email: 'officialcaverse@gmail.com'
        })
      });

      const result = await response.json();

      if (result.success) {
        setToastType("success");
        setToastMessage("Message sent successfully!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
        
        // Clear form
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setToastType("error");
      setToastMessage("Failed to send message. Please try again or email us directly.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic classes
  const bgClass = darkMode ? "bg-black" : "bg-white";
  const textClass = darkMode ? "text-white" : "text-black";
  const cardBg = darkMode ? "bg-white/2" : "bg-black/2";
  const inputBg = darkMode ? "bg-white/2" : "bg-black/2";
  const inputText = darkMode ? "text-white placeholder-gray-400" : "text-black placeholder-gray-500";
  const labelText = darkMode ? "text-gray-100" : "text-gray-800";
  const subtitleClass = darkMode ? "text-gray-300" : "text-gray-600";
  const borderClass = darkMode ? "border-white/20" : "border-black/20";
  const glowClass = darkMode ? "from-purple-500/20 to-pink-500/20" : "from-indigo-400/20 to-purple-400/20";

  return (
    <div className={`relative min-h-screen ${bgClass} ${textClass} px-6 py-16 transition-colors duration-500 overflow-hidden`}>
      {/* Animated Background */}
      <div className={`animated-bg ${darkMode ? "dark" : "light"}`} />

      {/* Floating Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${glowClass} animate-pulse`}
            style={{
              left: `${15 + i * 14}%`,
              animationDelay: `${i * 0.6}s`,
              animation: `float ${11 + i}s linear infinite`,
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

      {/* Page Title */}
      <h2 className="relative z-10 text-center text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
        Contact Us
      </h2>

      <p className={`relative z-10 text-center text-lg md:text-xl ${subtitleClass} max-w-2xl mx-auto mb-12`}>
        Have questions, suggestions, or just want to say hello? We're always happy to hear from you!
      </p>

      {/* Contact Form */}
      <div
        className={`relative z-10 w-full max-w-3xl mx-auto ${cardBg} backdrop-blur-xl p-10 rounded-3xl shadow-2xl border ${borderClass} mb-16 transition-all duration-500 hover:shadow-3xl hover:-translate-y-1`}
      >
        
        <div className="space-y-8">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className={`peer w-full p-4 rounded-xl ${inputBg} ${inputText} border ${borderClass} focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300`}
              placeholder=" "
              disabled={isSubmitting}
            />

            <label
              htmlFor="name"
              className={`absolute left-4 top-4 ${labelText} text-sm transition-all duration-300 pointer-events-none
                ${nameFocused || name ? "top-1 text-xs text-indigo-400" : ""}
                peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-400`}
            >
              Full Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className={`peer w-full p-4 rounded-xl ${inputBg} ${inputText} border ${borderClass} focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300`}
              placeholder=" "
              disabled={isSubmitting}
            />
            <label
              htmlFor="email"
              className={`absolute left-4 top-4 ${labelText} text-sm transition-all duration-300 pointer-events-none
                ${emailFocused || email ? "top-1 text-xs text-purple-400" : ""}
                peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-400`}
            >
              Email
            </label>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setMessageFocused(true)}
              onBlur={() => setMessageFocused(false)}
              rows={5}
              className={`peer w-full p-4 rounded-xl ${inputBg} ${inputText} border ${borderClass} focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 resize-none`}
              placeholder=" "
              disabled={isSubmitting}
            />
            <label
              htmlFor="message"
              className={`absolute left-4 top-4 ${labelText} text-sm transition-all duration-300 pointer-events-none
                ${messageFocused || message ? "top-1 text-xs text-pink-400" : ""}
                peer-focus:top-1 peer-focus:text-xs peer-focus:text-pink-400`}
            >
              Message
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className={`relative z-10 text-center mb-16 ${subtitleClass}`}>
        <p className="mb-2">
          Or reach us directly at:{" "}
          <a href="mailto:officialcaverse@gmail.com" className="text-indigo-400 hover:underline font-medium">
            officialcaverse@gmail.com
          </a>
        </p>
        <p>
          Phone: <span className="text-indigo-400 font-medium">+91 92171 23545</span> | Mon-Fri, 9 AM - 6 PM
        </p>
      </div>

      {/* Social Media */}
      <div className="relative z-10 flex justify-center gap-8 mb-16">
        {[
          { Icon: FaFacebook, color: "hover:text-indigo-400" },
          { Icon: FaInstagram, color: "hover:text-pink-400" },
          { Icon: FaTwitter, color: "hover:text-blue-400" },
          { Icon: FaLinkedin, color: "hover:text-purple-400" },
        ].map(({ Icon, color }, i) => (
          <a
            key={i}
            href="#"
            className={`p-3 rounded-full ${inputBg} backdrop-blur-md border ${borderClass} transition-all duration-300 hover:scale-110 hover:shadow-lg ${color}`}
          >
            <Icon size={28} />
          </a>
        ))}
      </div>

      {/* Google Map */}
      <div className="relative z-10 w-full max-w-4xl mx-auto h-80 rounded-3xl overflow-hidden border-2 border-transparent bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 p-1 shadow-2xl mb-16">
        <div className="w-full h-full bg-white dark:bg-black rounded-3xl overflow-hidden">
          <iframe
            title="CaVerse Greater Noida Office"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.320229699851!2d77.50704881510648!3d28.474372482446243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1c5f77c8cdd7%3A0x1234567890abcdef!2sGreater%20Noida%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>

      {/* Footer */}
      <p className={`relative z-10 text-center text-sm ${subtitleClass}`}>
        © {new Date().getFullYear()} CaVerse. All rights reserved.
      </p>

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl animate-bounce ${
          toastType === 'success' 
            ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
            : 'bg-gradient-to-r from-red-500 to-rose-600'
        } text-white`}>
          {toastType === 'success' ? (
            <FaCheckCircle size={24} />
          ) : (
            <FaExclamationCircle size={24} />
          )}
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default Contact;