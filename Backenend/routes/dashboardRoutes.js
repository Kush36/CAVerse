// routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { stats } = require("../controllers/dashboardController");

router.get("/stats", auth, stats);

module.exports = router;
