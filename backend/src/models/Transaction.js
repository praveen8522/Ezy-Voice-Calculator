import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'Credit Card', 'Debit Card', 'NetBanking'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Success', 'Pending', 'Failed'],
      default: 'Pending',
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', transactionSchema);