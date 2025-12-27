// routes/enrollRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const PaymentController = require("../controllers/paymentController");
const Enrollment = require("../controllers/paymentController"); // not used directly here

// create payment/enrollment
router.post("/", auth, PaymentController.createPayment);

// admin or user list
router.get("/", auth, async (req, res) => {
  const EnrollmentModel = require("../models/Enrollment");
  if (req.user.role === "admin") {
    const items = await EnrollmentModel.find().populate("user plan");
    return res.json(items);
  } else {
    const items = await EnrollmentModel.find({ user: req.user._id }).populate("plan");
    return res.json(items);
  }
});

module.exports = router;
