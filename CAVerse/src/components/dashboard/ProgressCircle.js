// src/components/dashboard/ProgressCircle.js
export default function ProgressCircle({ percent, label, color = "#8B5CF6" }) {
  const circumference = 2 * Math.PI * 56;

  return (
    <div className="text-center">
      <div className="relative w-40 h-40 mx-auto">
        <svg className="w-40 h-40 -rotate-90">
          <circle cx="80" cy="80" r="72" stroke="#1a1a1a" strokeWidth="14" fill="none" />
          <circle
            cx="80" cy="80" r="72"
            stroke={color}
            strokeWidth="14"
            fill="none"
            strokeDasharray={`${(percent / 100) * circumference} ${circumference}`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-white">{percent}%</span>
          <span className="text-sm text-gray-400 mt-1">{label}</span>
        </div>
      </div>
    </div>
  );
}