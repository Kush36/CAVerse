// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const { webhook } = require("../controllers/paymentController");

// For providers: stripe/razorpay webhook - require raw body and signature verification in real app
router.post("/webhook", express.json(), webhook);

module.exports = router;
