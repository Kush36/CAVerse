// models/Mentor.js
const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  subjects: [String],
  avatar: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Mentor", mentorSchema);
