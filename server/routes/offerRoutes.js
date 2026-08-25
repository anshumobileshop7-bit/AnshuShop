import express from 'express';
import {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  toggleOfferStatus,
  deleteOffer,
} from '../controllers/offerController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getOffers);
router.get('/:id', getOfferById);

// Admin routes
router.post('/', protect, upload.single('image'), createOffer);
router.put('/:id', protect, upload.single('image'), updateOffer);
router.patch('/:id/toggle', protect, toggleOfferStatus);
router.delete('/:id', protect, deleteOffer);

export default router;
