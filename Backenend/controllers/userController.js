// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.me = async (req, res) => {
  res.json(req.user);
};

exports.updateProfile = async (req, res) => {
  const updates = req.body;
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-password");
  res.json(user);
};
