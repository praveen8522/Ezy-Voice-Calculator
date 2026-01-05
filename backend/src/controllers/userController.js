import User from '../models/User.js';

// @route   GET /api/users/profile
// @desc    Get user profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/users/profile
// @desc    Update user profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, language, theme, city } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, language, theme, city },
      { new: true, runValidators: true }
    );

    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/users
// @desc    Get all users (Admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users, count: users.length });
  } catch (error) {
    next(error);
  }
};