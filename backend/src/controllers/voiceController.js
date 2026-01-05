import VoiceHistory from '../models/VoiceHistory.js';
import { io } from '../server.js';

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
// @desc    Process voice calculation and save to history
export const calculateVoice = async (req, res, next) => {
  const startTime = Date.now();
  
  try {
    const { text, result, language, duration, method } = req.body;
    
    // Validate input
    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Voice text is required'
      });
    }

    // Use provided result or calculate it
    const calculatedResult = result || processCalculation(text);
    const processingTime = Date.now() - startTime;

    // Save to history
    const voiceLog = await VoiceHistory.create({
      userId: req.user.id,
      type: 'voice',
      text: text.trim(),
      result: calculatedResult,
      language: language || 'ta-IN',
      processingTime,
      duration: duration || 0,
      method: method || 'Browser TTS',
      timestamp: new Date(),
    });

    // Emit real-time update to connected admin dashboards
    io.emit('voice:new', {
      userId: req.user.id,
      userName: req.user.name,
      text: text.trim(),
      result: calculatedResult,
      language,
      timestamp: voiceLog.timestamp
    });

    res.status(201).json({ 
      success: true, 
      result: calculatedResult, 
      log: voiceLog,
      processingTime 
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/voice/history
// @desc    Get user's voice history with pagination and filters
export const getHistory = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      filter = 'all', // all, today, week, month
      type = 'all', // all, voice, command, system
      language = 'all' // all, ta-IN, hi-IN, etc.
    } = req.query;

    // Build query
    const query = { userId: req.user.id };

    // Type filter
    if (type !== 'all') {
      query.type = type;
    }

    // Language filter
    if (language !== 'all') {
      query.language = language;
    }

    // Date filter
    const now = new Date();
    switch (filter) {
      case 'today':
        query.timestamp = {
          $gte: new Date(now.setHours(0, 0, 0, 0))
        };
        break;
      case 'week':
        query.timestamp = {
          $gte: new Date(now.setDate(now.getDate() - 7))
        };
        break;
      case 'month':
        query.timestamp = {
          $gte: new Date(now.setMonth(now.getMonth() - 1))
        };
        break;
      default:
        // 'all' - no date filter
        break;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with pagination
    const [history, totalCount] = await Promise.all([
      VoiceHistory.find(query)
        .sort({ timestamp: -1 }) // Most recent first
        .skip(skip)
        .limit(parseInt(limit))
        .lean(), // Use lean for better performance
      VoiceHistory.countDocuments(query)
    ]);

    // Calculate statistics
    const stats = await VoiceHistory.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: null,
          totalCalculations: { $sum: 1 },
          avgProcessingTime: { $avg: '$processingTime' },
          totalDuration: { $sum: '$duration' },
          languageBreakdown: {
            $push: '$language'
          }
        }
      }
    ]);

    res.json({ 
      success: true, 
      history,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        totalRecords: totalCount,
        hasNextPage: skip + history.length < totalCount,
        hasPrevPage: parseInt(page) > 1
      },
      stats: stats[0] || {
        totalCalculations: 0,
        avgProcessingTime: 0,
        totalDuration: 0
      }
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/voice/history
// @desc    Clear user's voice history (all or filtered)
export const clearHistory = async (req, res, next) => {
  try {
    const { filter = 'all', type = 'all' } = req.query;

    const query = { userId: req.user.id };

    // Type filter
    if (type !== 'all') {
      query.type = type;
    }

    // Date filter
    const now = new Date();
    switch (filter) {
      case 'today':
        query.timestamp = {
          $gte: new Date(now.setHours(0, 0, 0, 0))
        };
        break;
      case 'week':
        query.timestamp = {
          $gte: new Date(now.setDate(now.getDate() - 7))
        };
        break;
      case 'month':
        query.timestamp = {
          $gte: new Date(now.setMonth(now.getMonth() - 1))
        };
        break;
      default:
        // 'all' - no date filter
        break;
    }

    const result = await VoiceHistory.deleteMany(query);
    
    res.json({ 
      success: true, 
      message: 'History cleared successfully',
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/voice/history/:id
// @desc    Delete a single history entry
export const deleteHistoryEntry = async (req, res, next) => {
  try {
    const entry = await VoiceHistory.findOne({
      _id: req.params.id,
      userId: req.user.id // Security: ensure user owns this entry
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'History entry not found'
      });
    }

    await entry.deleteOne();

    res.json({
      success: true,
      message: 'History entry deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/voice/history/stats
// @desc    Get detailed statistics for user's voice history
export const getHistoryStats = async (req, res, next) => {
  try {
    const stats = await VoiceHistory.aggregate([
      { $match: { userId: req.user.id } },
      {
        $facet: {
          // Overall stats
          overall: [
            {
              $group: {
                _id: null,
                totalCalculations: { $sum: 1 },
                avgProcessingTime: { $avg: '$processingTime' },
                totalDuration: { $sum: '$duration' },
              }
            }
          ],
          // Language breakdown
          byLanguage: [
            {
              $group: {
                _id: '$language',
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } }
          ],
          // Type breakdown
          byType: [
            {
              $group: {
                _id: '$type',
                count: { $sum: 1 }
              }
            }
          ],
          // Daily activity (last 7 days)
          dailyActivity: [
            {
              $match: {
                timestamp: {
                  $gte: new Date(new Date().setDate(new Date().getDate() - 7))
                }
              }
            },
            {
              $group: {
                _id: {
                  $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
                },
                count: { $sum: 1 }
              }
            },
            { $sort: { _id: 1 } }
          ],
          // Most used method
          byMethod: [
            {
              $group: {
                _id: '$method',
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } }
          ]
        }
      }
    ]);

    res.json({
      success: true,
      stats: stats[0]
    });
  } catch (error) {
    next(error);
  }
};  