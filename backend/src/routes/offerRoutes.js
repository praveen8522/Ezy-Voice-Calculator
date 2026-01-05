import express from 'express';
import { getAllOffers, createOffer, updateOffer, deleteOffer } from '../controllers/offerController.js';
import { adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllOffers);
router.post('/', adminProtect, createOffer);
router.put('/:id', adminProtect, updateOffer);
router.delete('/:id', adminProtect, deleteOffer);

export default router;