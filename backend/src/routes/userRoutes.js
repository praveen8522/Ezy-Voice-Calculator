import express from 'express';
import { getProfile, updateProfile, getAllUsers } from '../controllers/userController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/', adminProtect, getAllUsers);

export default router;