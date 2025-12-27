/* eslint-disable no-unused-vars */
// src/components/dashboard/ActionCard.js
import { Link } from "react-router-dom";

export default function ActionCard({ icon: Icon, title, link, color = "purple" }) {
  return (
    <Link to={link} className="block group">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 hover:bg-white/10 transition-all hover:scale-105 hover:shadow-2xl">
        <Icon className={`text-8xl mx-auto mb-6 text-${color}-500 group-hover:scale-110 transition`} />
        <h3 className="text-2xl font-bold text-center text-white">{title}</h3>
      </div>
    </Link>
  );
}