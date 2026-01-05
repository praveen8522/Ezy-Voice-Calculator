import express from 'express';
import { adminLogin, getDashboard } from '../controllers/adminController.js';
import { adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/dashboard', adminProtect, getDashboard);

export default router;