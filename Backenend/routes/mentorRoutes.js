// routes/mentorRoutes.js
const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/mentorController");
const auth = require("../middleware/authMiddleware");

router.get("/", mentorController.list);
router.post("/", auth, mentorController.create);

module.exports = router;
