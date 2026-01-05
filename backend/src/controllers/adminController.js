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

export const getTodayVoiceCount = async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const count = await VoiceHistory.countDocuments({
    createdAt: { $gte: start }
  });

  res.json({ count });
};

export const getWeeklyVoiceStats = async (req, res) => {
  const start = new Date();
  start.setDate(start.getDate() - 6);

  const data = await VoiceHistory.aggregate([
    { $match: { createdAt: { $gte: start } } },
    {
      $group: {
        _id: { $dayOfWeek: "$createdAt" },
        count: { $sum: 1 }
      }
    }
  ]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const result = days.map((day, index) => {
    const found = data.find(d => d._id === index + 1);
    return { day, value: found ? found.count : 0 };
  });

  res.json(result);
};

export const getLanguageStats = async (req, res) => {
  const data = await VoiceHistory.aggregate([
    {
      $group: {
        _id: "$language",
        value: { $sum: 1 }
      }
    }
  ]);

  res.json(data);
};


export const getVoiceByRange = async (req, res) => {
  const { range } = req.query;
  let startDate = new Date();

  if (range === "7d") startDate.setDate(startDate.getDate() - 7);
  else if (range === "30d") startDate.setDate(startDate.getDate() - 30);
  else startDate.setHours(0, 0, 0, 0); // today

  const data = await VoiceHistory.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  res.json(data);
};
