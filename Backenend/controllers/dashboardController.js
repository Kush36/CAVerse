// controllers/dashboardController.js
const User = require("../models/User");
const Plan = require("../models/Plan");
const Enrollment = require("../models/Enrollment");

exports.stats = async (req, res) => {
  if (req.user.role === "admin") {
    const totalUsers = await User.countDocuments();
    const totalPlans = await Plan.countDocuments();
    const totalEnroll = await Enrollment.countDocuments();
    const paid = await Enrollment.countDocuments({ status: "paid" });
    return res.json({ totalUsers, totalPlans, totalEnroll, paid });
  } else {
    const myEnrollments = await Enrollment.find({ user: req.user._id }).populate("plan");
    return res.json({ count: myEnrollments.length, enrollments: myEnrollments });
  }
};
