import VoiceHistory from '../models/VoiceHistory.js';

// Helper function to process voice calculation
const processCalculation = (input) => {
  try {
    const converted = input
      .toLowerCase()
      .replace(/plus/g, '+')
      .replace(/minus/g, '-')
      .replace(/times|multiplied by|multiply/g, '*')
      .replace(/divided by|divide/g, '/')
      .replace(/power|to the power of/g, '**')
      .replace(/point/g, '.')
      .replace(/ /g, '');

    const clean = converted.replace(/[^0-9+\-*/().%^]/g, '');
    if (!clean) return 'Invalid expression';
    
    return eval(clean).toString();
  } catch {
    return 'Error in calculation';
  }
};

// @route   POST /api/voice/calculate
// @desc    Process voice calculation
export const calculateVoice = async (req, res, next) => {
  try {
    const { text, language } = req.body;
    
    const result = processCalculation(text);

    const voiceLog = await VoiceHistory.create({
      userId: req.user.id,
      type: 'voice',
      text,
      result,
      language: language || 'ta-IN',
    });

    res.json({ success: true, result, log: voiceLog });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/voice/history
// @desc    Get user's voice history
export const getHistory = async (req, res, next) => {
  try {
    const history = await VoiceHistory.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ success: true, history, count: history.length });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/voice/history
// @desc    Clear user's voice history
export const clearHistory = async (req, res, next) => {
  try {
    await VoiceHistory.deleteMany({ userId: req.user.id });
    res.json({ success: true, message: 'History cleared' });
  } catch (error) {
    next(error);
  }
};