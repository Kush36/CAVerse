// models/Plan.js
const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, // e.g. foundation-normal
  title: { type: String, required: true },
  price: { type: Number, default: 0 },
  originalPrice: { type: Number, default: 0 },
  features: [{ type: String }],
  badge: String,
  recommended: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Plan", planSchema);
