// controllers/planController.js
const Plan = require("../models/Plan");

exports.list = async (req, res) => {
  const plans = await Plan.find().sort({ recommended: -1, price: 1 });
  res.json(plans);
};

exports.get = async (req, res) => {
  const plan = await Plan.findOne({ slug: req.params.slug });
  if (!plan) return res.status(404).json({ error: "Plan not found" });
  res.json(plan);
};

exports.create = async (req, res) => {
  // simple admin check
  if (req.user.role !== "admin") return res.status(403).json({ error: "Not authorized" });

  const body = req.body;
  const plan = await Plan.create(body);
  res.status(201).json(plan);
};

exports.update = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Not authorized" });

  const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!plan) return res.status(404).json({ error: "Plan not found" });
  res.json(plan);
};

exports.remove = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Not authorized" });
  await Plan.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
