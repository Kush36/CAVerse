// controllers/testimonialController.js
const Testimonial = require("../models/Testimonial");

exports.list = async (req, res) => {
  const items = await Testimonial.find({ approved: true }).sort({ createdAt: -1 }).limit(50);
  res.json(items);
};

exports.create = async (req, res) => {
  const { quote, name, title } = req.body;
  const t = await Testimonial.create({ quote, name, title, approved: req.user?.role === "admin" });
  res.status(201).json(t);
};
