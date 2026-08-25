import express from 'express';
import { getAboutData, updateAboutData } from '../controllers/aboutController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public route
router.get('/', getAboutData);

// Admin route
router.put('/', protect, upload.single('image'), updateAboutData);

export default router;
