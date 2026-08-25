import express from 'express';
import { getAdminStats } from '../controllers/statsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAdminStats);

export default router;
