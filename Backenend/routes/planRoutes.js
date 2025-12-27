// routes/planRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const planController = require("../controllers/planController");

router.get("/", planController.list);
router.get("/:slug", planController.get);
router.post("/", auth, planController.create);
router.put("/:id", auth, planController.update);
router.delete("/:id", auth, planController.remove);

module.exports = router;
