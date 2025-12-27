// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { me, updateProfile } = require("../controllers/userController");

router.get("/me", auth, me);
router.put("/me", auth, updateProfile);

module.exports = router;
