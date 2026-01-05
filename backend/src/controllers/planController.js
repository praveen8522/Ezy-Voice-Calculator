import Plan from '../models/Plan.js';

// @route   GET /api/plans
// @desc    Get all plans
export const getAllPlans = async (req, res, next) => {
  try {
    const plans = await Plan.find({ status: 'Active' });
    res.json({ success: true, plans, count: plans.length });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/plans/:id
// @desc    Get single plan
export const getPlan = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json({ success: true, plan });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/plans (Admin only)
// @desc    Create new plan
export const createPlan = async (req, res, next) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json({ success: true, plan });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/plans/:id (Admin only)
// @desc    Update plan
export const updatePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json({ success: true, plan });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/plans/:id (Admin only)
// @desc    Delete plan
export const deletePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json({ success: true, message: 'Plan deleted' });
  } catch (error) {
    next(error);
  }
};