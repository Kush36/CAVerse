// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  enrollment: { type: mongoose.Schema.Types.ObjectId, ref: "Enrollment", required: true },
  provider: String,
  providerPaymentId: String,
  amount: Number,
  currency: { type: String, default: "INR" },
  status: { type: String, enum: ["created", "success", "failed"], default: "created" },
  raw: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);
