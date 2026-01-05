import express from 'express';
import { calculateVoice, getHistory, clearHistory } from '../controllers/voiceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/calculate', protect, calculateVoice);
router.get('/history', protect, getHistory);
router.delete('/history', protect, clearHistory);

export default router;