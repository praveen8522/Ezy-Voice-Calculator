import Admin from '../models/Admin.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import VoiceHistory from '../models/VoiceHistory.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route   POST /api/admin/login
// @desc    Admin login
export const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username }).select('+password');
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      admin: { id: admin._id, username: admin.username, role: admin.role },
      token: generateToken(admin._id),
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/admin/dashboard
// @desc    Get dashboard stats
export const getDashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    const voiceInputsToday = await VoiceHistory.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
    });

    // Calculate success rate
    const successfulTxns = await Transaction.countDocuments({ status: 'Success' });
    const successRate = totalTransactions > 0 
      ? ((successfulTxns / totalTransactions) * 100).toFixed(2) 
      : 0;

    res.json({
      success: true,
      stats: {
        totalUsers,
        voiceInputsToday,
        avgProcessingTime: '0.8s',
        successRate: `${successRate}%`,
        totalTransactions,
      },
    });
  } catch (error) {
    next(error);
  }
};



export const adminTest = async (req, res) => {
  console.log('\n✅ Admin Test Endpoint Hit');
  res.json({
    success: true,
    message: 'Admin routes are working!',
    timestamp: new Date().toISOString(),
  });
};