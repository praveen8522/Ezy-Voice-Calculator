import express from 'express';
import { getAllPlans, getPlan, createPlan, updatePlan, deletePlan } from '../controllers/planController.js';
import { adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPlans);
router.get('/:id', getPlan);
router.post('/', adminProtect, createPlan);
router.put('/:id', adminProtect, updatePlan);
router.delete('/:id', adminProtect, deletePlan);

export default router;