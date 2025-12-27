// controllers/mentorController.js
const Mentor = require("../models/Mentor");

exports.list = async (req, res) => {
  const mentors = await Mentor.find({ isActive: true }).limit(50);
  res.json(mentors);
};

exports.create = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Not authorized" });
  const m = await Mentor.create(req.body);
  res.status(201).json(m);
};
