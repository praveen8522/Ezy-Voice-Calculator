import Transaction from '../models/Transaction.js';

// @route   POST /api/transactions
// @desc    Create transaction
export const createTransaction = async (req, res, next) => {
  try {
    const { amount, paymentMethod, planId } = req.body;

    const transaction = await Transaction.create({
      userId: req.user.id,
      amount,
      paymentMethod,
      planId,
      status: 'Success', // Simulate successful payment
    });

    res.status(201).json({ success: true, transaction });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/transactions
// @desc    Get all transactions (Admin)
export const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find()
      .populate('userId', 'name email')
      .populate('planId', 'name price')
      .sort({ createdAt: -1 });

    res.json({ success: true, transactions, count: transactions.length });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/transactions/user/:userId
// @desc    Get user transactions
export const getUserTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId })
      .populate('planId', 'name price')
      .sort({ createdAt: -1 });

    res.json({ success: true, transactions, count: transactions.length });
  } catch (error) {
    next(error);
  }
};