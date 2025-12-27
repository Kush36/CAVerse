// src/components/OfferBar.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function OfferBar() {
  const [time, setTime] = useState(() => {
    const savedEnd = localStorage.getItem("offerEndTime");
    if (savedEnd) {
      const remaining = Math.max(0, parseInt(savedEnd) - Math.floor(Date.now() / 1000));
      if (remaining > 0) return remaining;
    }
    const duration = 3 * 60 * 60 + 15 * 60 + 59; // 3h 15m 59s
    const endTime = Math.floor(Date.now() / 1000) + duration;
    localStorage.setItem("offerEndTime", endTime);
    return duration;
  });

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        const newTime = Math.max(0, prev - 1);
        if (newTime === 0) {
          // Reset timer when it reaches zero
          const duration = 3 * 60 * 60 + 15 * 60 + 59;
          const endTime = Math.floor(Date.now() / 1000) + duration;
          localStorage.setItem("offerEndTime", endTime);
          return duration;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const formatTime = (t) => {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;
    return { h, m, s };
  };

  const { h, m, s } = formatTime(time);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white text-sm md:text-base px-4 py-3 flex flex-wrap justify-center items-center gap-3 md:gap-6 font-semibold shadow-lg backdrop-blur-sm">
      <span className="flex items-center gap-2">
        🎉 <span className="hidden sm:inline">Enjoy Study, Pay Less</span>
      </span>
      <span>
        Use <b className="text-yellow-300">CaVerse45</b> — <b>Up to 45% OFF</b>
      </span>

      <span className="bg-black/30 px-4 py-1.5 rounded-full font-mono tracking-wide">
        {h.toString().padStart(1, "0")}h :{" "}
        {m.toString().padStart(2, "0")}m : {s.toString().padStart(2, "0")}s
      </span>

      <Link 
        to="/Courses"
      className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:scale-105 hover:bg-yellow-300 hover:shadow-lg transition-all">
        BUY NOW
      </Link>
    </div>
  );
}