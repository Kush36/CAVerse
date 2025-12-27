// routes/testimonialRoutes.js
const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialController");
const auth = require("../middleware/authMiddleware");

router.get("/", testimonialController.list);
router.post("/", auth, testimonialController.create);

module.exports = router;
