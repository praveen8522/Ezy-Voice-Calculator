import mongoose from 'mongoose';

const voiceHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // Index for faster queries
    },
    type: {
      type: String,
      enum: ['voice', 'command', 'system'],
      required: true,
      default: 'voice'
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    result: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: 'ta-IN',
      enum: ['ta-IN', 'hi-IN', 'en-US', 'te-IN', 'kn-IN', 'ml-IN']
    },
    processingTime: {
      type: Number, // in milliseconds
      default: 0,
    },
    duration: {
      type: Number, // voice recording duration in seconds
      default: 0,
    },
    method: {
      type: String, // TTS method used
      enum: ['Browser TTS', 'Google TTS', 'Phonetic English', 'English Fallback'],
      default: 'Browser TTS'
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true, // Index for sorting
    },
  },
  { 
    timestamps: true,
    // Automatically create createdAt and updatedAt
  }
);

// Compound index for efficient user-specific queries with date sorting
voiceHistorySchema.index({ userId: 1, timestamp: -1 });

// Virtual for time ago display
voiceHistorySchema.virtual('timeAgo').get(function() {
  const seconds = Math.floor((new Date() - this.timestamp) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
});

// Ensure virtuals are included in JSON
voiceHistorySchema.set('toJSON', { virtuals: true });
voiceHistorySchema.set('toObject', { virtuals: true });

export default mongoose.model('VoiceHistory', voiceHistorySchema);