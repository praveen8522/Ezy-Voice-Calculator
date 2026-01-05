import express from 'express';
import { 
  calculateVoice, 
  getHistory, 
  clearHistory,
  deleteHistoryEntry,
  getHistoryStats
} from '../controllers/voiceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Calculate and save voice input
router.post('/calculate', calculateVoice);

// Get history with pagination and filters
router.get('/history', getHistory);

// Get detailed statistics
router.get('/history/stats', getHistoryStats);

// Delete specific history entry
router.delete('/history/:id', deleteHistoryEntry);

// Clear history (all or filtered)
router.delete('/history', clearHistory);

export default router;