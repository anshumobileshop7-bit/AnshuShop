import express from 'express';
import {
  loginAdmin,
  getAdminProfile,
  updateAdminPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', loginLimiter, loginAdmin);
router.get('/me', protect, getAdminProfile);
router.put('/change-password', protect, updateAdminPassword);

export default router;
