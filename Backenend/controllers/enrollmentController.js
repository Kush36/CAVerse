const Enrollment = require('../models/Enrollment');
const Plan = require('../models/Plan');

// @desc    Create an enrollment
// @route   POST /api/enrollments
// @access  Private
const createEnrollment = async (req, res) => {
  const { planId } = req.body;

  if (!planId) {
    return res.status(400).json({ message: 'Please provide a plan ID' });
  }

  const plan = await Plan.findById(planId);

  if (!plan) {
    return res.status(404).json({ message: 'Plan not found' });
  }

  // Check if user already enrolled in this plan
  const existingEnrollment = await Enrollment.findOne({
    user: req.user._id,
    plan: planId,
    status: { $in: ['pending', 'active'] },
  });

  if (existingEnrollment) {
    return res.status(400).json({ message: 'Already enrolled in this plan' });
  }

  const enrollment = await Enrollment.create({
    user: req.user._id,
    plan: planId,
  });

  const populatedEnrollment = await Enrollment.findById(enrollment._id)
    .populate('plan', 'title level duration price');

  res.status(201).json(populatedEnrollment);
};

// @desc    Get all enrollments
// @route   GET /api/enrollments
// @access  Private/Admin
const getEnrollments = async (req, res) => {
  const { status, user } = req.query;
  
  let filter = {};
  if (status) filter.status = status;
  if (user) filter.user = user;

  const enrollments = await Enrollment.find(filter)
    .populate('user', 'name email')
    .populate('plan', 'title level duration price')
    .sort({ createdAt: -1 });
  
  res.json(enrollments);
};

// @desc    Get enrollment by ID
// @route   GET /api/enrollments/:id
// @access  Private
const getEnrollmentById = async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id)
    .populate('user', 'name email phone')
    .populate('plan');

  if (!enrollment) {
    return res.status(404).json({ message: 'Enrollment not found' });
  }

  // Check if user owns this enrollment or is admin
  if (enrollment.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  res.json(enrollment);
};

// @desc    Get user's enrollments
// @route   GET /api/enrollments/my-enrollments
// @access  Private
const getMyEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user._id })
    .populate('plan', 'title level duration price features')
    .sort({ createdAt: -1 });
  
  res.json(enrollments);
};

// @desc    Update enrollment
// @route   PUT /api/enrollments/:id
// @access  Private/Admin
const updateEnrollment = async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id);

  if (!enrollment) {
    return res.status(404).json({ message: 'Enrollment not found' });
  }

  enrollment.status = req.body.status || enrollment.status;
  enrollment.progress = req.body.progress !== undefined ? req.body.progress : enrollment.progress;
  enrollment.endDate = req.body.endDate || enrollment.endDate;
  enrollment.paymentStatus = req.body.paymentStatus || enrollment.paymentStatus;

  const updatedEnrollment = await enrollment.save();
  
  const populatedEnrollment = await Enrollment.findById(updatedEnrollment._id)
    .populate('user', 'name email')
    .populate('plan', 'title level');

  res.json(populatedEnrollment);
};

// @desc    Delete enrollment
// @route   DELETE /api/enrollments/:id
// @access  Private/Admin
const deleteEnrollment = async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id);

  if (enrollment) {
    await enrollment.deleteOne();
    res.json({ message: 'Enrollment removed' });
  } else {
    res.status(404).json({ message: 'Enrollment not found' });
  }
};

module.exports = {
  createEnrollment,
  getEnrollments,
  getEnrollmentById,
  getMyEnrollments,
  updateEnrollment,
  deleteEnrollment,
};