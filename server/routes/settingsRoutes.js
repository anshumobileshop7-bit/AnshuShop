import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route
router.get('/', getSettings);

// Admin route
router.put('/', protect, updateSettings);

export default router;
