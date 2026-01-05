import express from 'express';
import { adminLogin, getDashboard, getLanguageStats,getWeeklyVoiceStats, getTodayVoiceCount, getVoiceByRange } from '../controllers/adminController.js';
import { adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/dashboard', adminProtect, getDashboard);
router.get("/voice/today", adminProtect, getTodayVoiceCount);
router.get("/voice/weekly", adminProtect, getWeeklyVoiceStats);
router.get("/voice/language", adminProtect, getLanguageStats);
router.get("/voice/range", adminProtect, getVoiceByRange);


export default router;