// controllers/paymentController.js
const Enrollment = require("../models/Enrollment");
const Payment = require("../models/Payment");
const Plan = require("../models/Plan");
const generateToken = require("../utils/generateToken");

/**
 * createPayment -> create an enrollment and return a mock payment clientSecret or real provider info
 */
exports.createPayment = async (req, res) => {
  const { planId } = req.body;
  if (!planId) return res.status(400).json({ error: "planId required" });

  const plan = await Plan.findById(planId);
  if (!plan) return res.status(404).json({ error: "Plan not found" });

  // create enrollment
  const enrollment = await Enrollment.create({
    user: req.user._id,
    plan: plan._id,
    status: plan.price === 0 ? "paid" : "pending"
  });

  if (plan.price === 0) {
    // create a payment record for trace
    const payment = await Payment.create({
      enrollment: enrollment._id,
      provider: "free",
      amount: 0,
      status: "success",
      raw: {}
    });
    enrollment.paymentInfo = { provider: "free", paymentId: payment._id };
    await enrollment.save();
    return res.json({ enrollment, payment });
  }

  // MOCK payment provider response
  if ((process.env.PAYMENT_PROVIDER || "mock") === "mock") {
    const clientSecret = `mock_client_secret_${enrollment._id}`;
    // create Payment record
    const payment = await Payment.create({
      enrollment: enrollment._id,
      provider: "mock",
      amount: plan.price,
      status: "created",
      raw: { clientSecret }
    });
    return res.json({ enrollment, payment, clientSecret });
  }

  // If STRIPE is configured, create PaymentIntent (example)
  if (process.env.PAYMENT_PROVIDER === "stripe" && process.env.STRIPE_SECRET) {
    const stripe = require("stripe")(process.env.STRIPE_SECRET);
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(plan.price * 100),
      currency: "inr",
      metadata: { enrollmentId: enrollment._id.toString() }
    });
    const payment = await Payment.create({
      enrollment: enrollment._id,
      provider: "stripe",
      providerPaymentId: intent.id,
      amount: plan.price,
      status: "created",
      raw: intent
    });
    return res.json({ enrollment, clientSecret: intent.client_secret });
  }

  res.status(500).json({ error: "No payment provider configured" });
};

/**
 * webhook endpoint for provider to call back
 * For mock, accept body { enrollmentId, status }
 */
exports.webhook = async (req, res) => {
  const { enrollmentId, status, providerPaymentId } = req.body;
  if (!enrollmentId) return res.status(400).json({ error: "enrollmentId required" });

  const enrollment = await Enrollment.findById(enrollmentId);
  if (!enrollment) return res.status(404).json({ error: "Enrollment not found" });

  // update enrollment & create Payment record
  enrollment.status = status === "success" ? "paid" : status === "failed" ? "cancelled" : enrollment.status;
  await enrollment.save();

  const payment = await Payment.create({
    enrollment: enrollment._id,
    provider: req.body.provider || "webhook",
    providerPaymentId: providerPaymentId || null,
    amount: req.body.amount || null,
    status: status === "success" ? "success" : status
  });

  return res.json({ ok: true, enrollment, payment });
};
