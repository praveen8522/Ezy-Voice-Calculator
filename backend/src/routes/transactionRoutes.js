import express from 'express';
import { createTransaction, getAllTransactions, getUserTransactions } from '../controllers/transactionController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTransaction);
router.get('/', adminProtect, getAllTransactions);
router.get('/user/:userId', protect, getUserTransactions);

export default router;