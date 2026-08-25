import express from 'express';
import { getHeroData, updateHeroData } from '../controllers/heroController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public route to view hero
router.get('/', getHeroData);

// Admin route to update hero
router.put('/', protect, upload.array('images', 5), updateHeroData);

export default router;
