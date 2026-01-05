import mongoose from 'mongoose';

const voiceHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['voice', 'command', 'system'],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: 'ta-IN',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('VoiceHistory', voiceHistorySchema);