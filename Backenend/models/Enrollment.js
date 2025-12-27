// models/Enrollment.js
const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  status: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  paymentInfo: { type: Object }
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
 