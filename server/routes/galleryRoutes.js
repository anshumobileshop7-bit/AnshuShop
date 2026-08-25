import express from 'express';
import {
  getGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage,
} from '../controllers/galleryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public route
router.get('/', getGalleryImages);

// Admin routes
router.post('/', protect, upload.single('image'), uploadGalleryImage);
router.delete('/:id', protect, deleteGalleryImage);

export default router;
