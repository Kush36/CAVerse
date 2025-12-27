// models/Testimonial.js
const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  quote: String,
  name: String,
  title: String,
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
